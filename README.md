# Requirements

Imagine you are a company that wants to assist some companies to ship their goods to customers in Hamburg. To achieve this, lets assume that every order can be represented by a tuple (orderId, companyName, customerAddress, orderedItem). Thus, some sample data might look like this:

```
001, SuperTrader, Steindamm 80, Macbook
002, Cheapskates, Reeperbahn 153, Macbook
003, MegaCorp, Steindamm 80, Book "Guide to Hamburg"
004, SuperTrader, Sternstrasse  125, Book "Cooking  101"
005, SuperTrader, Ottenser Hauptstrasse 24, Inline Skates
006, MegaCorp, Reeperbahn 153, Playstation
007, Cheapskates, Lagerstrasse  11, Flux compensator
008, SuperTrader, Reeperbahn 153, Inline Skates
```

Using *node.js*, please implement a working solution to perform the following kind of operations on the data:

1. show all orders from a particular company
2. show all orders to a particular address
3. delete a particular order given an OrderId
4. display how often each item has been ordered, in descending order (ie in the above example, 2x for Macbook and Inline skates, 1x for the rest)

Please optimize your code and do not convolute it with handling exceptions/edge cases – we are more interested in readability for this solution.
