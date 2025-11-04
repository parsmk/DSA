### Inventory System 

The inventory system works with a series of heaps and a relational graph. The graph is weighted by tag relationship and popularity. Further heuristics can be added.

Big issue right now is the tag system requires a full lookup through the products meaning at least O(n) on each insert or update operation for the graph. That said since edges are tracked via heap inserting a node O(dnlogn) where d = number of tags and n is number of products. The time complexity is pretty good all things considered. 

The weights of the edges of the graph are themselves placed in a maxheap to pickup best matches immediately. There is also a function that lets you search to a certain depth for most related products.

The tag system though intriguing suffers when tags are limited. The more tags are utilized the more accurate the relationships at the cost of more computation time. Seeing as it's already inefficient this will but add to inefficiencies
