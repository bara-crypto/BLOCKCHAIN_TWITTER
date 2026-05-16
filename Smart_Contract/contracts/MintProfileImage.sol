// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProfileImageNfts is ERC721, Ownable {
    using Strings for uint256;

    uint256 private _tokenIds; // Replaced Counters with simple uint256
    mapping(uint256 => string) private _tokenURIs;

    struct RenderToken {
        uint256 id;
        string uri;
        string space;
    }

    // Pass msg.sender to Ownable
    constructor() ERC721("ProfileImageNfts", "PIN") {}

    function _setTokenURI(uint256 tokenId, string memory _tokenuri) internal {
        _tokenURIs[tokenId] = _tokenuri;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function getAlltoken() public view returns(RenderToken[] memory) {
        uint256 latestId = _tokenIds;
        RenderToken[] memory res = new RenderToken[](latestId);
        for(uint256 i = 0; i < latestId; i++) {
            string memory uri = _tokenURIs[i];
            res[i] = RenderToken(i, uri, " ");
        }
        return res;
    }

    function mint(address recipient, string memory _uri) public returns (uint256) {
        uint256 newId = _tokenIds;
        _mint(recipient, newId);
        _setTokenURI(newId, _uri);
        _tokenIds++; 
        return newId;
    }
}




// pragma solidity ^0.8.2;

// import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";



// contract ProfileImageNfts is ERC721, Ownable {

//   // using Counters for Counters.Counter;
//   using Strings for uint256;

//   uint256 private _tokenIds;
//   mapping(uint256 => string) _tokenURIs;

//   struct RenderToken 
//   {
//     uint256 id;
//     string uri;
//     string space;

//   }

//   constructor() ERC721("ProfileImageNfts", "PIN") Ownable(msg.sender) {}

//   function _setTokenURI(uint256 tokenId, string memory tokenuri) internal 
//   {
//     _tokenURIs[tokenId] = tokenuri;
//   }



//   function tokenURI(uint256 tokenId) public view virtual override returns (string memory) 
//   {
//     require(_exists(tokenId), "URI does not exist. ERC721Metadata: URI query for nonexistent token");
//     string memory _RUri = _tokenURIs[tokenId];
//     return _RUri;
//   }



//   function getAlltoken() public view returns(RenderToken[] memory)
//   {
//     uint256 latestId = _tokenIds.current();
//     RenderToken[] memory res = new RenderToken[](latestId);
//     for(uint256 i=0; i<latestId; i++)
//     {
//       if(_exists(i))
//       {
//         string memory uri = tokenURI(i);
//         res[i] = RenderToken(i, uri, " ");
//       }
//     }
//     return res;
//   }

//   function mint(address recipient, string memory _uri) public returns (uint256)
//   {
//     uint256 newId = _tokenIds.current();
//     _mint(recipient, newId);
//     _setTokenURI(newId, _uri);
//     _tokenIds.increment();
//     return newId;
//   }



// }

