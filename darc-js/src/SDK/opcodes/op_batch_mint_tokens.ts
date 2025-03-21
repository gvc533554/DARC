import { ethers } from "ethers";  
import {OperationStruct} from "../../types/basicTypes";

export function op_batch_mint_tokens(addressArray: string[], tokenClass: bigint[], amountArray: bigint[]): OperationStruct {
  // make sure the length of addressArray and amountArray are the same
  if (addressArray.length != amountArray.length) {
    throw new Error("The length of addressArray and amountArray are different");
  }
  // make sure the length of addressArray and amountArray are not zero
  if (addressArray.length == 0) {
    throw new Error("The length of addressArray and amountArray are zero");
  }
  // make sure address array is valid array of address strings  
  for (let i = 0; i < addressArray.length; i++) {
    if (typeof addressArray[i] != "string") {
      throw new Error("The addressArray is not a valid array of address strings");
    }
    if (ethers.utils.isAddress(addressArray[i]) == false) {
      throw new Error("The addressArray is not a valid array of address strings");
    }
  }

  // make sure amount array and token class are valid bigints or numbers, and if it is number, convert it to bigint
  for (let i = 0; i < amountArray.length; i++) {
    if (typeof amountArray[i] === "number") {
      amountArray[i] = BigInt(amountArray[i]);
    }
    if (typeof amountArray[i] !== "bigint") {
      throw new Error("The amountArray is not a valid array of bigints");
    }
  }

  // make sure token class is valid array of bigints or numbers, and if it is number, convert it to bigint
  for (let i = 0; i < tokenClass.length; i++) {
    if (typeof tokenClass[i] === "number") {
      tokenClass[i] = BigInt(tokenClass[i]);
    }
    if (typeof tokenClass[i] !== "bigint") {
      throw new Error("The tokenClass is not a valid array of bigints");
    }
  }

  //create the operation
  let operation = {
    operatorAddress: "",
    opcode: 1, // mint token
    param: {
      
      
      STRING_ARRAY: [],
      BOOL_ARRAY: [],
      VOTING_RULE_ARRAY: [],

      PLUGIN_ARRAY: [],
      PARAMETER_ARRAY: [],
      UINT256_2DARRAY: [
        tokenClass,
        amountArray
      ],
      ADDRESS_2DARRAY: [
        addressArray
      ],
      BYTES: []
    }
  };

  return operation;

}