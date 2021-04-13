console.log("...nocss...");

function css(el) {
  var sheets = document.styleSheets,
    ret = [];
  el.matches =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector ||
    el.oMatchesSelector;
  for (var i in sheets) {
    var rules = sheets[i].rules || sheets[i].cssRules;
    for (var r in rules) {
      if (el.matches(rules[r].selectorText)) {
        // console.log(rules[r].style.cssText);
        // ret.push(rules[r].cssText);
        // ret.push(rules[r].style.cssText.replace(/\s/g, ''));
        toReplace = " !important";
        ret.push(rules[r].style.cssText.replace(" !important", ""));
      }
    }
  }
  return ret.join("");
}

// 1. Select all nodes referencing other
nodes = document.querySelectorAll("[ref]");

if (nodes.length > 0) {
  // 2. Loop through all referencing nodes
  nodes.forEach(function(node) {
    nodeReference = node.getAttribute("ref");
    // 3. Select all styles of referenced node
    style = css(document.getElementById(nodeReference));
    // 4. Set styles on node
    node.setAttribute("style", style);
  });
} else {
  console.error("One or more reference nodes missing!");
}
