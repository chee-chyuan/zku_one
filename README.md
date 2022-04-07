# ZKU_one background Assignment

## HelloWorld.sol
Unit test has been written to demonstate basic property of the smart contract

Example screenshot in Remix:
<img width="1250" alt="image" src="https://user-images.githubusercontent.com/60590919/162229579-72321d69-812c-4ad3-9168-a1067bb032eb.png">



## Ballot.sol
As Ropsten is abit slow to me, I increase the time limit from 5 minutes to 10minutes. Hope you don't mind

Unit test has been written to demonstate the effect of time limit

### Deployed version
The modified `Ballot.sol` has been deployed and verified in Ropsten Etherscan
https://ropsten.etherscan.io/address/0x9485Cff33F47b70302c198AFD2e1fDD923B33cD2

The successful vote the happens before the time limit
https://ropsten.etherscan.io/tx/0xa3843fa141795437593ca2c1526031729ca63b44782841f8022c34e4c0a07094

Reverted transaction after time limit with Custom Error
https://ropsten.etherscan.io/tx/0xd21719602d783c153eaeaf06fc62dd2b6cdcc024fa324e815a50e1e56aaafaa6
