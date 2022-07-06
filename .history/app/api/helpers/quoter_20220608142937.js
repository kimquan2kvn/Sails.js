module.exports =  sync: true,
friendlyName: 'Random quote',
description: 'Return a random quote.',
fn: function (inputs, exits) {
    let quotes = sails.config.custom.quotes;
    var totalAmount = quotes.length;
    var rand = Math.floor(Math.random() * totalAmount);
    return exits.success(quotes[rand]);
}
};
  