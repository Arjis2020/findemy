var properties = {
    browser: [
        [/msie ([\.\_\d]+)/, 'ie'],
        [/trident\/.*?rv:([\.\_\d]+)/, 'ie'],
        [/firefox\/([\.\_\d]+)/, 'firefox'],
        [/chrome\/([\.\_\d]+)/, 'chrome'],
        [/version\/([\.\_\d]+).*?safari/, 'safari'],
        [/mobile safari ([\.\_\d]+)/, 'safari'],
        [/android.*?version\/([\.\_\d]+).*?safari/, 'com.android.browser'],
        [/crios\/([\.\_\d]+).*?safari/, 'chrome'],
        [/opera/, 'opera'],
        [/opera\/([\.\_\d]+)/, 'opera'],
        [/opera ([\.\_\d]+)/, 'opera'],
        [/opera mini.*?version\/([\.\_\d]+)/, 'opera.mini'],
        [/opios\/([a-z\.\_\d]+)/, 'opera'],
        [/blackberry/, 'blackberry'],
        [/blackberry.*?version\/([\.\_\d]+)/, 'blackberry'],
        [/bb\d+.*?version\/([\.\_\d]+)/, 'blackberry'],
        [/rim.*?version\/([\.\_\d]+)/, 'blackberry'],
        [/iceweasel\/([\.\_\d]+)/, 'iceweasel'],
        [/edge\/([\.\d]+)/, 'edge']
    ],
    os: [
        [/linux ()([a-z\.\_\d]+)/, 'linux'],
        [/mac os x/, 'mac os'],
        [/mac os x.*?([\.\_\d]+)/, 'mac os'],
        [/os ([\.\_\d]+) like mac os/, 'ios'],
        [/openbsd ()([a-z\.\_\d]+)/, 'openbsd'],
        [/android/, 'android'],
        [/android ([a-z\.\_\d]+);/, 'android'],
        [/mozilla\/[a-z\.\_\d]+ \((?:mobile)|(?:tablet)/, 'firefoxos'],
        [/windows\s*(?:nt)?\s*([\.\_\d]+)/, 'windows'],
        [/windows phone.*?([\.\_\d]+)/, 'windows.phone'],
        [/windows mobile/, 'windows.mobile'],
        [/blackberry/, 'blackberryos'],
        [/bb\d+/, 'blackberryos'],
        [/rim.*?os\s*([\.\_\d]+)/, 'blackberryos']
    ],
    device: [
        [/ipad/, 'ipad'],
        [/iphone/, 'iphone'],
        [/lumia/, 'lumia'],
        [/htc/, 'htc'],
        [/nexus/, 'nexus'],
        [/galaxy nexus/, 'galaxy.nexus'],
        [/nokia/, 'nokia'],
        [/ gt\-/, 'galaxy'],
        [/ sm\-/, 'galaxy'],
        [/xbox/, 'xbox'],
        [/(?:bb\d+)|(?:blackberry)|(?: rim )/, 'blackberry']
    ]
};

var UNKNOWN = 'Unknown';

var propertyNames = Object.keys(properties);

let result = {}

function capitalize(string) {
    const tokens = string.split(" ")
    const capitalizedTokens = tokens.map(token => token.charAt(0).toUpperCase() + token.substring(1).toLowerCase())
    return capitalizedTokens.join(' ')
}

propertyNames.forEach(function (propertyName) {
    result[propertyName] = {
        name: UNKNOWN,
        version: [],
        versionString: UNKNOWN
    };
});

function determineProperty(propertyName, userAgent) {
    properties[propertyName].forEach(function (propertyMatcher) {
        var propertyRegex = propertyMatcher[0];
        var propertyValue = capitalize(propertyMatcher[1]);

        var match = userAgent.match(propertyRegex);

        if (match) {
            result[propertyName].name = propertyValue;

            if (match[2]) {
                result[propertyName].versionString = match[2];
                result[propertyName].version = [];
            } else if (match[1]) {
                result[propertyName].versionString = match[1].replace(/_/g, '.');
                result[propertyName].version = parseVersion(match[1]);
            } else {
                result[propertyName].versionString = UNKNOWN;
                result[propertyName].version = [];
            }
        }
    });
}

function parseVersion(versionString) {
    return versionString.split(/[\._]/).map(function (versionPart) {
        return parseInt(versionPart);
    });
}

function sniff(userAgentString) {
    var isBrowser = typeof window !== 'undefined';
    var fallbackUserAgent = isBrowser ? navigator.userAgent : '';
    var userAgent = (userAgentString || fallbackUserAgent).toLowerCase();

    propertyNames.forEach(function (propertyName) {
        determineProperty(propertyName, userAgent);
    });
    return result
};


module.exports = sniff