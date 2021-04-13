// 1. Select all nodes referencing other components
nodes = document.querySelectorAll("[ref]");

if (nodes.length > 0) {
  // 2. Loop through all referencing nodes
  nodes.forEach(function(node) {
    nodeReference = node.getAttribute("ref");
    // 3. Apply component class on each node
    node.classList.add("component-" + nodeReference);
  });
} else {
  console.error("One or more reference nodes missing!");
}
