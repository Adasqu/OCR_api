
module.exports = function (rawText) {
    var returnedValue = {
        nip: rawText.match('NIP+:?[ ]+[1-9]{10}\n')[0],
        bankAccount: rawText.match('NIP+:?[ ]+[1-9]{10}\n')[0],
    }
    console.log(returnedValue)
}