import { Input, List } from 'antd';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import Board from './Board';

const { Search } = Input;
interface Props {
  data: any;
  clickDetail: any;
}

const RoomLists: React.FC<Props> = props => {
  const { data, clickDetail } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(data);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const onSearch = (value: any) => {
    setIsSearching(true);
    setSearchTerm(value.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      // have value
      setIsSearching(false);
      const res = data.filter(
        (item: any) =>
          item.roomId.toString() === debouncedSearchTerm ||
          item.name.toLowerCase() === debouncedSearchTerm.toLowerCase()
      );
      setResult(res);
    } else {
      // empty value
      setIsSearching(false);
      setResult(data);
    }
  }, [data, debouncedSearchTerm]);

  return (
    <div className="w-full">
      <Search
        onChange={onSearch}
        loading={isSearching}
        enterButton
        placeholder="Input id or name room"
        className="w-1/3 my-5 custom-search"
      />
      <List
        grid={{ gutter: 16, column: 5 }}
        pagination={{ defaultPageSize: 10 }}
        dataSource={result}
        renderItem={item => {
          return (
            <List.Item>
              <Board item={item} clickDetail={clickDetail} />
            </List.Item>
          );
        }}
      />
    </div>
  );
};
export default RoomLists;
