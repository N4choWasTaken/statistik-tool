type Props = {
  items: Array<{ key: string | number; name: string; href: string }>;
};

const ItemList = ({ items }: Props) => {
  return (
    <div className="section itemlist__wrapper">
      <div className="itemlist__link__wrapper">
        {items.map((item) => (
          <a key={item.key} className="itemlist__link" href={item.href}>
            {item.name}
            <svg
              style={{ marginLeft: "10px" }}
              width="23"
              height="12"
              viewBox="0 0 23 12"
              fill="none"
              xmlns="http:www.w3.org/2000/svg"
            >
              <path
                d="M1 5.25004H0.25V6.75004H1V5.25004ZM22.5303 6.53037C22.8232 6.23748 22.8232 5.7626 22.5303 5.46971L17.7574 0.696739C17.4645 0.403839 16.9896 0.403839 16.6967 0.696739C16.4038 0.989639 16.4038 1.46454 16.6967 1.75744L20.9393 6.00004L16.6967 10.2427C16.4038 10.5356 16.4038 11.0104 16.6967 11.3033C16.9896 11.5962 17.4645 11.5962 17.7574 11.3033L22.5303 6.53037ZM1 6.75004L22 6.75004V5.25004L1 5.25004V6.75004Z"
                fill="black"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
