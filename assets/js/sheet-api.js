/* 구글 스프레드시트 스크립트 시작 */
var jsonp = function (url) {
    var script = window.document.createElement('script');
    script.async = true;
    script.src = url;
    script.onerror = function () {
        alert('구글 스프레드 시트 파일에 접근할 수 없습니다.')
    };
    var done = false;
    script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
            done = true;
            script.onload = script.onreadystatechange = null;
            if (script.parentNode) {
                return script.parentNode.removeChild(script);
            }
        }
    };
    window.document.getElementsByTagName('head')[0].appendChild(script);
};

//스프레드 시트에서 받아 온 데이터 파싱
var parse = function (data) {
    
    if (!data.table) {
        return false;
    }
    var column_length = data.table.cols.length;
    if (!column_length || !data.table.rows.length) {
        return false;
    }
    var columns = [],
        result = [], 
        row_length,
        value;

    //cols의 label이 빈 값이므로 row의 첫번째 행을 column으로 지정
    for (var column_idx in data.table.cols) {
        columns.push(data.table.rows[0]['c'][column_idx].v);
    }
    
    //row 데이터 불러오기
    for (var rows_idx in data.table.rows) {
        row_length = data.table.rows[rows_idx]['c'].length;
        if (column_length != row_length) {
            return false;
        }
        for (var row_idx in data.table.rows[rows_idx]['c']) {
            if (!result[rows_idx]) {
                result[rows_idx] = {};
            }

            if(data.table.rows[rows_idx]['c'][row_idx] != null && data.table.rows[rows_idx]['c'][row_idx].v) {
                value = data.table.rows[rows_idx]['c'][row_idx].v;
            }
            else {
                value = "";
            }
            
            if ((columns[row_idx] + '') == 'option' && value != '?' && value != 'option') {
                try {
                    result[rows_idx][columns[row_idx]] = JSON.parse(value);
                } catch (e) {
                    console.log(value);
                }
            } else {
                result[rows_idx][columns[row_idx]] = value;
            }
        }
    }
    return result.slice(1);
};

var query = function (sql, callback) {
    var url = 'https://spreadsheets.google.com/a/google.com/tq?',
        params = {
            key: '1YNepNSqpcV4Xeggpl7Nfh0Ty7VWUFtEybAjdqNlYjrc',
            tq: encodeURIComponent(sql),
            range: 'Sheet1!A1:F181',
            tqx: 'responseHandler:' + callback
        },
        qs = [];
    for (var key in params) {
        qs.push(key + '=' + params[key]);
    }
    url += qs.join('&');
    return jsonp(url); // JSONP 도우미 호출
}

var parse2 = function (data) {
    if (!data.table) {
        return false;
    }
    var column_length = data.table.cols.length;
    if (!column_length || !data.table.rows.length) {
        return false;
    }
    var columns = [],
        result = [], 
        row_length,
        value;
        
    //cols의 label이 빈 값이므로 row의 첫번째 행을 column으로 지정
    for (var column_idx in data.table.cols) {
        columns.push(data.table.cols[column_idx].label);
    }
    
    //row 데이터 불러오기
    for (var rows_idx in data.table.rows) {
        row_length = data.table.rows[rows_idx]['c'].length;
        if (column_length != row_length) {
            return false;
        }
        for (var row_idx in data.table.rows[rows_idx]['c']) {
            if (!result[rows_idx]) {
                result[rows_idx] = {};
            }

            if(data.table.rows[rows_idx]['c'][row_idx] != null && data.table.rows[rows_idx]['c'][row_idx].v) {
                value = data.table.rows[rows_idx]['c'][row_idx].v;
            }
            else {
                value = "";
            }
            
            result[rows_idx][columns[row_idx]] = value;
        }
    }
    return result.slice(0);
};

var optionQuery = function (sql, callback) {
    var url = 'https://spreadsheets.google.com/a/google.com/tq?',
        params = {
            key: '1YNepNSqpcV4Xeggpl7Nfh0Ty7VWUFtEybAjdqNlYjrc',
            tq: encodeURIComponent(sql),
            range: 'Sheet2!A1:L45',
            tqx: 'responseHandler:' + callback
        },
        qs = [];
    for (var key in params) {
        qs.push(key + '=' + params[key]);
    }
    url += qs.join('&');
    return jsonp(url); // JSONP 도우미 호출
}

var summonQuery = function (sql, callback) {
    var url = 'https://spreadsheets.google.com/a/google.com/tq?',
        params = {
            key: '1YNepNSqpcV4Xeggpl7Nfh0Ty7VWUFtEybAjdqNlYjrc',
            tq: encodeURIComponent(sql),
            range: 'Sheet3!A1:G600',
            tqx: 'responseHandler:' + callback
        },
        qs = [];
    for (var key in params) {
        qs.push(key + '=' + params[key]);
    }
    url += qs.join('&');
    return jsonp(url); // JSONP 도우미 호출
}

var skillQuery = function (sql, callback) {
    var url = 'https://spreadsheets.google.com/a/google.com/tq?',
        params = {
            key: '1YNepNSqpcV4Xeggpl7Nfh0Ty7VWUFtEybAjdqNlYjrc',
            tq: encodeURIComponent(sql),
            range: 'Sheet4!A1:N368',
            tqx: 'responseHandler:' + callback
        },
        qs = [];
    for (var key in params) {
        qs.push(key + '=' + params[key]);
    }
    url += qs.join('&');
    return jsonp(url);
}