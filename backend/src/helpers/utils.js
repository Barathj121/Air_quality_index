class Utils {
    
    static getDate(dateString){
        return new Date(Date.parse(dateString.replace(' ', 'T')));
    }

    static getFormattedDate(date){
        const pad = (num) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }
}

module.exports = Utils;