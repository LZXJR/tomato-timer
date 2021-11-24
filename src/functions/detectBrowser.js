export const detectBrowser = () => {
  if (typeof window === "undefined") return;
  let browserDetect;
  browserDetect = {
    init: function () {
      this.browser =
        this.searchString(this.dataBrowser) || "An unknown browser";
      this.version =
        this.searchVersion(window.navigator.userAgent) ||
        this.searchVersion(window.navigator.appVersion) ||
        "an unknown version";
      this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
      for (let i = 0; i < data.length; i++) {
        const dataString = data[i].string;
        const dataProp = data[i].prop;
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) !== -1)
            return data[i].identity;
        } else if (dataProp) return data[i].identity;
      }
    },
    searchVersion: function (dataString) {
      const index = dataString.indexOf(this.versionSearchString);
      if (index === -1) return;
      return parseFloat(
        dataString.substring(index + this.versionSearchString.length + 1)
      );
    },
    dataBrowser: [
      { string: window.navigator.userAgent,
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version",
        subString:"OPR",
      },
      { string: window.navigator.userAgent,
        identity: "Edge",
        subString:"Edg",
      },
      {
        string: window.navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome",
      },
      {
        string: window.navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb",
      },
      {
        string: window.navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version",
      },
      
      {
        string: window.navigator.vendor,
        subString: "iCab",
        identity: "iCab",
      },
      {
        string: window.navigator.vendor,
        subString: "KDE",
        identity: "Konqueror",
      },
      {
        string: window.navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox",
      },
      {
        string: window.navigator.vendor,
        subString: "Camino",
        identity: "Camino",
      },
      {
        /* For Newer Netscapes (6+) */
        string: window.navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape",
      },
      {
        string: window.navigator.userAgent,
        subString: "MSIE",
        identity: "Internet Explorer",
        versionSearch: "MSIE",
      },
      {
        string: window.navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv",
      },
      {
        /* For Older Netscapes (4-) */
        string: window.navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla",
      },
    ],
    dataOS: [
      {
        string: window.navigator.platform,
        subString: "Win",
        identity: "Windows",
      },
      {
        string: window.navigator.platform,
        subString: "Mac",
        identity: "Mac",
      },
      {
        string: window.navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod",
      },
      {
        string: window.navigator.platform,
        subString: "Linux",
        identity: "Linux",
      },
    ],
  };
  browserDetect.init();

  return browserDetect?.browser;
};
