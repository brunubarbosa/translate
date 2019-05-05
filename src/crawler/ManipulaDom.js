const jsdom = require("jsdom");
const { JSDOM } = jsdom;


class ManipulaDOM {
    constructor(html) {
        this.dom = new JSDOM(html);
        this.exempleTable = this.dom.window.document.querySelector(".examples");
        this.linesExample = this.findLines();
        this.twoSides = this.lineForSide()
        this.plainText = {
            left:this.clearTextSide(this.twoSides.left),
            right:this.clearTextSide(this.twoSides.right)
        }

    }

    findLines() {
        let lineList = [];
        this.exempleTable.querySelectorAll('tr').forEach(element => {
            lineList = [...lineList, element]
        });
        return lineList
    }

    lineForSide() {
        let bothLanguage = {
            left: [],
            right: []
        }
        this.linesExample.forEach(element => {
            let lineCeils = element.querySelectorAll('td')
            bothLanguage.left = [...bothLanguage.left, lineCeils[0]]
            bothLanguage.right = [...bothLanguage.right, lineCeils[1]]
        })
        return bothLanguage;
    }

    clearTextSide(side) {
        
        let plainText = [];
        side.forEach(element=> {
            element.querySelectorAll("*[class^='placeholder']").forEach(placeholder => {
                if(placeholder.classList[0].endsWith('2')){
                    placeholder.remove()
                    
                   }
               })
               element.querySelectorAll("*[class^='source_url']").forEach(soureFont => {
                   soureFont.remove()
               })
   
               plainText = [...plainText, element.textContent.replace(/(\r\n|\n|\r)/gm,"")]
           })
           return plainText
    }
}

module.exports = ManipulaDOM;