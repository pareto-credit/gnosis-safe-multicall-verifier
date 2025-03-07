import { ethers } from "ethers";
import fs from "fs";

const txData = fs.readFileSync("./multicall.json", "utf8");
const transactions = JSON.parse(txData).transactions;
console.log("Transactions number:", transactions.length);
const safeMulticall = [];
for (const tx of transactions) {
  const methodSig = tx.methodSig; // is something like transfer(address,uint256)
  const iface = new ethers.utils.Interface([`function ${methodSig}`]);
  const data = iface.encodeFunctionData(methodSig, tx.args);
  const dataLength = ethers.utils.hexDataLength(data);

  const packedData = ethers.utils.solidityPack(
    ["uint8", "address", "uint256", "uint256", "bytes"],
    [0, tx.to, tx.value, dataLength, data]
  );

  safeMulticall.push(packedData);
}

const safeMulticallPackedHex = ethers.utils.hexlify(ethers.utils.concat(safeMulticall));
const iface = new ethers.utils.Interface([`function multiSend(bytes)`]);
const data = iface.encodeFunctionData('multiSend(bytes)', [safeMulticallPackedHex]);
console.log("Encoded data: ");
console.log(data);