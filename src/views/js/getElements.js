var mediaRules = [];
var usedSelectors = [];
var classGrouped = [];
var scriptText = [];
var htmlSelectorParentArray = [];
var elementRemover = function() {
	var allHtml = document.getElementsByTagName("*");
	var allCss = document.styleSheets;


	console.log($('#script').children("*"))


	console.log(allHtml)
	console.log(allCss)
	var htmlSelectorArray = []
		//put all HTML elements in an array
	for (var i = 0; i < allHtml.length; i++) {
		if (allHtml[i].tagName.toLowerCase() === 'script') {
			scriptText.push(allHtml[i].text);
		}
		if (allHtml[i].id !== "") {
			//FIND HTML ID'S
			var htmlID = '#' + allHtml[i].id.replace(/\s/g, '')
			htmlSelectorArray.push(htmlID);

			//FIND PARENTS  OF ID
			var parentsArrayID = $(htmlID.toString()).parents("*")
			for (var parent = 0; parent < parentsArrayID.length - 2; parent++) {
				if (parentsArrayID[parent].id !== "") {
					htmlSelectorArray.push("#" + parentsArrayID[parent].id + " " + htmlID);
				}
				if (parentsArrayID[parent].tagName.toLowerCase() !== "div") {
					htmlSelectorArray.push(parentsArrayID[parent].tagName.toLowerCase() + " " + htmlID);
				}
				var classGroupParent = "." + parentsArrayID[parent].className.replace(/ /g, ".");
				var ParentClassIsolator = parentsArrayID[parent].className.split(" ");
				if (parentsArrayID[parent].className !== "") {
					for (var CParent = 0; CParent < ParentClassIsolator.length; CParent++) {
						htmlSelectorArray.push("." + ParentClassIsolator[CParent] + " " + htmlID);
					}
				}
			}
		}
		if (allHtml[i].tagName.toLowerCase() !== "div") {
			//FIND HTML TAGS

			var htmlTag = allHtml[i].tagName.toLowerCase().replace(/\s/g, '')

			htmlSelectorArray.push(htmlTag);

			//FIND PARENTS  OF TAG
			var parentsArrayTag = $(htmlTag.toString()).parents("*")
			for (var parent = 0; parent < parentsArrayTag.length - 2; parent++) {
				if (parentsArrayTag[parent].id !== "") {
					htmlSelectorArray.push("#" + parentsArrayTag[parent].id + " " + htmlTag);
				}
				if (parentsArrayTag[parent].tagName.toLowerCase() !== "div") {
					htmlSelectorArray.push(parentsArrayTag[parent].tagName.toLowerCase() + " " + htmlTag);
				}
				var classGroupParent = "." + parentsArrayTag[parent].className.replace(/ /g, ".");
				var ParentClassIsolator = parentsArrayTag[parent].className.split(" ");
				if (parentsArrayTag[parent].className !== "") {
					for (var CParent = 0; CParent < ParentClassIsolator.length; CParent++) {
						htmlSelectorArray.push("." + ParentClassIsolator[CParent] + " " + htmlTag);
					}
				}
			}
		};
		var classGroup = "." + allHtml[i].className.replace(/ /g, ".");
		if (classGroup !== ".") {
			htmlSelectorArray.push(classGroup);
		};
		// ISOLATE GROUPED CLASSES
		var classIsolator = allHtml[i].className.split(" ");
		for (var c = 0; c < classIsolator.length; c++) {
			if (classIsolator[c] !== "" && classIsolator[c] !== 'col') {
				var htmlClass = "." + classIsolator[c].replace(/\s/g, '');
				htmlSelectorArray.push(htmlClass);
				//FIND PARENTS OF CLASS
				var parentsArrayClass = $(htmlClass.toString()).parents("*")
				for (var parent = 0; parent < parentsArrayClass.length - 2; parent++) {
					if (parentsArrayClass[parent].id !== "") {
						htmlSelectorArray.push("#" + parentsArrayClass[parent].id + " " + htmlClass);
					}
					if (parentsArrayClass[parent].tagName.toLowerCase() !== "div") {
						htmlSelectorArray.push(parentsArrayClass[parent].tagName.toLowerCase() + " " + htmlClass);
					}
					var classGroupParent = "." + parentsArrayClass[parent].className.replace(/ /g, ".");
					var ParentClassIsolator = parentsArrayClass[parent].className.split(" ");
					if (parentsArrayClass[parent].className !== "") {
						for (var CParent = 0; CParent < ParentClassIsolator.length; CParent++) {
							htmlSelectorArray.push("." + ParentClassIsolator[CParent] + " " + htmlClass);
						}
					}
				}
				//GET CLASSES FOR RESPONSIVE DESIGN.
			}
			for (var size = 0; size < 13; size++) {
				htmlSelectorArray.push(".row .col.s" + size);
				htmlSelectorArray.push(".row .col.m" + size);
				htmlSelectorArray.push(".row .col.l" + size);
			}
		}
	}
	//remove all empty array elements 
	for (var i = 0; i < htmlSelectorArray.length; i++) {
		if (htmlSelectorArray[i] == "") {
			htmlSelectorArray.splice(i, 1)
		}
	}
	// rule out duplicates
	////
	var arr1 = [];

	for (var unique in htmlSelectorArray) {
		if (arr1.indexOf(htmlSelectorArray[unique]) === -1) {
			arr1.push(htmlSelectorArray[unique]);
		}
	}



	var usableHTMLArray = arr1;
	var test = arr1.join("\n");



	//iterate through cssSheetList
	for (var q = 0; q < allCss.length; q++) {
		if (allCss[q].cssRules == null) {
			continue
		};
		// console.log(allCss.length)
		// console.log(allCss[q].cssRules.length)
		// console.log(usableHTMLArray.length)

		for (var i = 0; i < allCss[q].cssRules.length; i++) {

			//iterate through cssFile 
			if (allCss[q].cssRules[i].selectorText) {

				//for each cssRule check if present in HTML file
				for (var j = 0; j < usableHTMLArray.length; j++) {

					var split = allCss[q].cssRules[i].selectorText.split(", ")

					for (var l = 0; l < split.length; l++) {
						// console.log("html  +  :    " +(usableHTMLArray[j] + ":"))
						// console.log("substracted CSS     :   " + split[l].substr(0,usableHTMLArray[j].length))
						// console.log(split[l].substr(0,usableHTMLArray[j].length) == (usableHTMLArray[j] + ":"))
						if (split[l] == usableHTMLArray[j] || (usableHTMLArray[j].indexOf(split[l]) >= 0 && split[l].length > 3) || split[l].substr(0, usableHTMLArray[j].length + 1) == (usableHTMLArray[j] + ":") || (usableHTMLArray[j].indexOf(" ") >= 0 && split[l].indexOf(usableHTMLArray[j]) >= 0)) {
							// usedSelectors.push(split[l]);
							usedSelectors.push(split[l] + allCss[q].cssRules[i].cssText.substr(allCss[q].cssRules[i].selectorText.length));
						}
						//CHECK INNER-HTML SCRIPT FOR CSS RULES
						for (var script = 0; script < scriptText.length; script++) {
							if (scriptText[script].indexOf(split[l].substr(1)) >= 0) {
								usedSelectors.push(allCss[q].cssRules[i].cssText)
							}
						}
					}
				} //MEDIA RULES
			} else if (allCss[q].cssRules[i].cssRules) {

				for (var m = 0; m < allCss[q].cssRules[i].cssRules.length; m++) {

					for (var jm = 0; jm < usableHTMLArray.length; jm++) {

						if (allCss[q].cssRules[i].cssRules[m].selectorText == undefined) {
							continue
						};
						var splitMedia = allCss[q].cssRules[i].cssRules[m].selectorText.split(", ")
						for (var media = 0; media < splitMedia.length; media++) {
							if (splitMedia[media] == usableHTMLArray[jm] || (usableHTMLArray[jm].indexOf(splitMedia[media]) >= 0 && splitMedia[media].length > 6)) {
								mediaRules.push(allCss[q].cssRules[i].cssRules[m].cssText);
								if (m == allCss[q].cssRules[i].cssRules.length - 1) {

									// var hankyDoodle = mediaRules.join(" ");
									var arr2 = [];

									for (var rule in mediaRules) {
										if (arr2.indexOf(mediaRules[rule]) === -1) {
											arr2.push(mediaRules[rule]);
										}
									}
									var hankyDoodle = arr2.join(" ");

									usedSelectors.push("\n" + "@media " + allCss[q].cssRules[i].media.mediaText + "{" + hankyDoodle + "}")
									mediaRules = [];
								}
							}
						}
					}
				}
			}
		};
	}
	// rule out duplicates
	var arr3 = [];

	for (var rule in usedSelectors) {
		if (arr3.indexOf(usedSelectors[rule]) === -1) {
			arr3.push(usedSelectors[rule]);
		}
	}
	console.log(arr3.length)
	var usableCssArray = arr3.join("\n");
	console.log(usableCssArray)
}

elementRemover();

$( "#externalHtml" ).load( "index2.html", function() {
  alert( "Load was performed." );
});