# badLottery.sol - Security issues

- No locked Pragma
- Functions are all public so everyone can access (May not be a big issue since no configurations occur)
- Use random number generator instead of block.timestamp
- ERC20 import is not beeing utilized
- winnersPaid event does not make any sense since it is called when newPlayers function is called and only emits nonset prizeAmount
- Overflow in for loop when distributing prize
- Force feeding in line 31 could cause no payout
- Contract needs to be monitored by everyone to payout since it is only possible to payout when contract balance is 500.000 * 100 -> this corresponds to new players which only get added when they pay 500.000
