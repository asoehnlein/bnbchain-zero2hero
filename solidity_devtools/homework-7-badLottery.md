# badLottery.sol - Security issues

- No locked Pragma
- Functions are all public so everyone can access and can call "distributePrize" function directly form outside with any amount
- distributePrize has buffer overrun so it will be reverted (should be "<" instead of "<=" in the for loop)
- distributePrize is not declared as payable
- Use random number generator instead of block.timestamp
- pickWinner can be called from outside by any actor and adds winner address directly if timing is mached. So everybody has good chances to add himself to winners list by calling pickWinner frequently enougth. Afterwards he can call distributePrize (which is currently buggy too and will never transfer funds)
- ERC20 import is not beeing utilized
- winnersPaid event does not make any sense since it is called when newPlayers function is called and only emits nonset prizeAmount
- Overflow in for loop when distributing prize
- Force feeding in line 31 could cause no payout
- Contract needs to be monitored by everyone to payout since it is only possible to payout when contract balance is 500.000 * 100 -> this corresponds to new players which only get added when they pay 500.000. So the question is who is taking care (any paying gas) for reward monioring/distribution.
- Strange calculation of the amount "amountToPay =  prize_winners.length / 100; " Supposed we have 3 winners , amount to pay will be 0.03 (any rounding happens?). But amount should be something like 500000*players.length /prize_winners.length
- After payout no cleaning of winners array
- Literals are used instead of constants, logic is programmed in tricky way (bad programming style imho)
