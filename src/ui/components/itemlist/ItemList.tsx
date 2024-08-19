type Props = {
  items: Array<{ key: number; name: string; href: string }>;
};

const ItemList = ({ items }: Props) => {
  return (
    <div className="section itemlist__wrapper">
      {items.map((item) => (
        <h3 onClick={() => (window.location.href = item.href)} key={item.key}>
          {item.name}
        </h3>
      ))}
    </div>
  );
};

export default ItemList;
