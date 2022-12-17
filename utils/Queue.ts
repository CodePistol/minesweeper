class Queue<T> {
  items: T[];
  head: number;
  tail: number;
  constructor() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }
  enqueue = (item: T) => {
    this.items[this.tail] = item;
    this.tail++;
  };
  deque = () => {
    const items = [...this.items];
    if (items.length > 0) {
      const dequeuedItem = items[0];
      items.splice(0, 1);
      this.tail--;
      this.items = items;
      return dequeuedItem;
    }
    return null;
  };
  getLength = () => {
    return this.items.length;
  };
}

export default Queue;
