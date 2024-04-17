// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    
    uint256 public numberOfCampaigns = 0;

    /**
     * @dev Starts a new campaign.
     * @param _owner The address of the campaign owner.
     * @param _title The title of the campaign.
     * @param _description The description of the campaign.
     * @param _target The funding target in wei.
     * @param _deadline The deadline as a Unix timestamp.
     * @param _image A URI to the campaign image.
     * @return The index of the new campaign.
     */
    function startNewCampaign(
        address _owner, 
        string memory _title, 
        string memory _description, 
        uint256 _target, 
        uint256 _deadline, 
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    /**
     * @dev Supports a campaign by sending Ether.
     * @param _id The campaign identifier.
     */
    function supportCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "This campaign has already ended.");

        uint256 amount = msg.value;
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        require(sent, "Failed to forward funds");

        campaign.amountCollected += amount;
    }

    /**
     * @dev Views donors of a specific campaign.
     * @param _id The campaign identifier.
     * @return The addresses and amounts of donations.
     */
    function viewDonors(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    /**
     * @dev Retrieves all campaigns.
     * @return An array of all campaigns.
     */
    function viewAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }
}
