
class DefaultData {

    static getData() {
        const fields = ['orderId', 'companyName', 'customerAddress', 'orderedItem'];
        const data = [
            ['001', 'SuperTrader', 'Speindamm 80', 'Macbook'],
            ['002', 'Cheapskates', 'Reeperbahn 153', 'Macbook'],
            ['003', 'MegaCorp', 'Speindamm 80', 'Book "Guide to Hamburg"'],
            ['004', 'SuperTrader', 'Sternstrasse 80', 'Book "Cooking 101"'],
            ['005', 'SuperTrader', 'Ottenser Hauptstrasse 24', 'Inline Skates'],
            ['006', 'MegaCorp', 'Reeperbahn 153', 'Playstation'],
            ['007', 'Cheapskates', 'Lagerstrasse  11', 'Flux compensator'],
            ['008', 'SuperTrader', 'Reeperbahn 153', 'Inline Skates'],
        ];
        let processedData = [];
        for (let order of data) {
            let processedOrder = {};
            for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
                processedOrder[fields[fieldIndex]] = order[fieldIndex];
            }
            processedData.push(processedOrder);
        }
        return processedData;
    }
}
module.exports = DefaultData;