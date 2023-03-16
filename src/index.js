const ethers = require("ethers");
const airnodeAbi = require("@api3/airnode-abi");

function computeEndpointId(endpointName) {
  const oisTitle = "Nodary";
  return ethers.solidityPackedKeccak256(
    ["string", "string"],
    [oisTitle, endpointName]
  );
}

function computeFeedId(feedName) {
  const endpointId = computeEndpointId("feed");
  const parameters = airnodeAbi.encode([
    {
      name: "name",
      type: "string32",
      value: feedName,
    },
  ]);
  return ethers.solidityPackedKeccak256(
    ["bytes32", "bytes"],
    [endpointId, parameters]
  );
}

module.exports = { computeEndpointId, computeFeedId };
