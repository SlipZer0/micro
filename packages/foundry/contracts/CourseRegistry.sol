// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CourseRegistry
 * @notice Stores course metadata, pricing (rate per second), ownership and status for FlowLearn.
 * @dev Lightweight registry intended to be queried by frontend and by other contracts (e.g., PaymentStreaming).
 *      The contract uses OpenZeppelin Ownable for platform admin operations.
 */

import "@openzeppelin/contracts/access/Ownable.sol";

contract CourseRegistry is Ownable {
    /// @notice Course ID counter
    uint256 private _courseCounter;

    /// @notice Course metadata structure
    struct Course {
        address creator;       // creator wallet address
        string title;          // human readable title
        string metadataURI;    // off-chain metadata (IPFS/Arweave/HTTP)
        uint256 ratePerSecond; // price in smallest token units per second
        uint256 previewSeconds;// free preview duration in seconds
        bool active;           // is course available for purchase/stream
        bool banned;           // admin banned flag (true => not allowed)
        uint256 createdAt;     // timestamp
        uint256 updatedAt;     // timestamp
    }

    /// @notice Mapping from courseId => Course
    mapping(uint256 => Course) private courses;

    /// @notice Emitted when a course is created
    event CourseCreated(uint256 indexed courseId, address indexed creator, string title, uint256 ratePerSecond);

    /// @notice Emitted when a course is updated
    event CourseUpdated(uint256 indexed courseId, string metadataURI, uint256 ratePerSecond);

    /// @notice Emitted when preview duration is changed
    event PreviewUpdated(uint256 indexed courseId, uint256 previewSeconds);

    /// @notice Emitted when course status (active/banned) is changed
    event CourseStatusChanged(uint256 indexed courseId, bool active, bool banned);

    /// @notice Emitted when ownership of a course is transferred
    event CourseOwnershipTransferred(uint256 indexed courseId, address indexed previousCreator, address indexed newCreator);

    constructor() Ownable(msg.sender) {
        // owner is set to deployer
    }

    // --------------------------
    //    CREATOR OPERATIONS
    // --------------------------

    /**
     * @notice Create a new course entry in the registry
     * @param _title Short title for the course
     * @param _metadataURI Pointer to course metadata (IPFS/Arweave/HTTP)
     * @param _ratePerSecond Price per second (in token smallest units)
     * @param _previewSeconds Free preview length in seconds
     * @return courseId Newly minted course ID
     */
    function createCourse(
        string calldata _title,
        string calldata _metadataURI,
        uint256 _ratePerSecond,
        uint256 _previewSeconds
    ) external returns (uint256 courseId) {
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_metadataURI).length > 0, "Metadata URI required");
        require(_ratePerSecond > 0, "Rate must be > 0");

        _courseCounter++;
        courseId = _courseCounter;

        courses[courseId] = Course({
            creator: msg.sender,
            title: _title,
            metadataURI: _metadataURI,
            ratePerSecond: _ratePerSecond,
            previewSeconds: _previewSeconds,
            active: true,
            banned: false,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        emit CourseCreated(courseId, msg.sender, _title, _ratePerSecond);
    }

    /**
     * @notice Update metadata and rate for a course
     * @dev Only the course creator can update their course.
     */
    function updateCourse(
        uint256 _courseId,
        string calldata _metadataURI,
        uint256 _ratePerSecond
    ) external {
        Course storage c = courses[_courseId];
        require(c.creator != address(0), "Course not found");
        require(msg.sender == c.creator, "Not course creator");
        require(!c.banned, "Course banned");

        // allow metadata update and rate change
        if (bytes(_metadataURI).length > 0) {
            c.metadataURI = _metadataURI;
        }
        if (_ratePerSecond > 0) {
            c.ratePerSecond = _ratePerSecond;
        }

        c.updatedAt = block.timestamp;

        emit CourseUpdated(_courseId, c.metadataURI, c.ratePerSecond);
    }

    /**
     * @notice Set the free preview duration (seconds) for a course
     * @dev Only course creator can update preview window
     */
    function setPreviewDuration(uint256 _courseId, uint256 _previewSeconds) external {
        Course storage c = courses[_courseId];
        require(c.creator != address(0), "Course not found");
        require(msg.sender == c.creator, "Not course creator");
        require(!c.banned, "Course banned");

        c.previewSeconds = _previewSeconds;
        c.updatedAt = block.timestamp;

        emit PreviewUpdated(_courseId, _previewSeconds);
    }

    /**
     * @notice Allow creator to activate/deactivate their course
     */
    function setActive(uint256 _courseId, bool _active) external {
        Course storage c = courses[_courseId];
        require(c.creator != address(0), "Course not found");
        require(msg.sender == c.creator, "Not course creator");
        require(!c.banned, "Course banned");

        c.active = _active;
        c.updatedAt = block.timestamp;

        emit CourseStatusChanged(_courseId, c.active, c.banned);
    }

    /**
     * @notice Transfer ownership of a course to another creator address
     */
    function transferCourseOwnership(uint256 _courseId, address _newCreator) external {
        require(_newCreator != address(0), "Invalid new owner");
        Course storage c = courses[_courseId];
        require(c.creator != address(0), "Course not found");
        require(msg.sender == c.creator, "Not course creator");

        address previous = c.creator;
        c.creator = _newCreator;
        c.updatedAt = block.timestamp;

        emit CourseOwnershipTransferred(_courseId, previous, _newCreator);
    }

    // --------------------------
    //    ADMIN (OWNER) FUNCTIONS
    // --------------------------

    /**
     * @notice Ban or unban a course (platform moderation)
     * @dev Only contract owner (platform admin) can ban/unban courses.
     */
    function setBanned(uint256 _courseId, bool _banned) external onlyOwner {
        Course storage c = courses[_courseId];
        require(c.creator != address(0), "Course not found");

        c.banned = _banned;
        if (_banned) {
            c.active = false; // banning deactivates the course
        }
        c.updatedAt = block.timestamp;

        emit CourseStatusChanged(_courseId, c.active, c.banned);
    }

    /**
     * @notice Forcefully remove a course record (use with care)
     * @dev Only platform owner can remove. This does not attempt refunds/stream handling.
     */
    function removeCourse(uint256 _courseId) external onlyOwner {
        Course storage c = courses[_courseId];
        require(c.creator != address(0), "Course not found");

        // delete mapping entry
        delete courses[_courseId];

        emit CourseStatusChanged(_courseId, false, true); // flagged as removed/banned
    }

    // --------------------------
    //    VIEW / HELPERS
    // --------------------------

    /**
     * @notice Returns basic course information
     * @dev Useful for other contracts to read pricing and creator address.
     */
    function getCourse(uint256 _courseId)
        external
        view
        returns (
            address creator,
            string memory title,
            string memory metadataURI,
            uint256 ratePerSecond,
            uint256 previewSeconds,
            bool active,
            bool banned,
            uint256 createdAt,
            uint256 updatedAt
        )
    {
        Course storage c = courses[_courseId];
        require(c.creator != address(0), "Course not found");

        return (
            c.creator,
            c.title,
            c.metadataURI,
            c.ratePerSecond,
            c.previewSeconds,
            c.active,
            c.banned,
            c.createdAt,
            c.updatedAt
        );
    }

    /**
     * @notice Convenience getter for just the rate and creator (for PaymentStreaming)
     */
    function getRateAndCreator(uint256 _courseId) external view returns (uint256 ratePerSecond, address creator) {
        Course storage c = courses[_courseId];
        require(c.creator != address(0), "Course not found");
        return (c.ratePerSecond, c.creator);
    }

    /**
     * @notice Returns whether a course is available for streaming/purchase
     */
    function isCourseActive(uint256 _courseId) external view returns (bool) {
        Course storage c = courses[_courseId];
        if (c.creator == address(0)) return false;
        return (c.active && !c.banned);
    }
}
