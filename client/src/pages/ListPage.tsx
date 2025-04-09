import React, { useEffect, useMemo, useState } from 'react';
import { ListItem } from './components';
import useData from './useData';
import useSort from './useSort';

const SubTitle: React.FC<any> = ({children}) => (
    <h2 className={'list-subtitle'}>Active Item ID: {children}</h2>
)

function ListPage() {

    const {items, loading, isRefreshing} = useData();
    const [sortedItems, sortBy, handleSortClick] = useSort(items);

    const [query, setQuery] = useState<string>('');
    const [activeItemId,  setActiveItemId] = useState<any>(null);
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    
    const activeItemText = useMemo(() => activeItemId ? activeItemId : 'Empty', [activeItemId]);
    
  const handleItemClick = (id: any) => {
    setActiveItemId(id);
  };
  
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
  }
    
    useEffect(() => {
        if(query.length > 0) {
            setFilteredItems(sortedItems.filter((item) => String(item.id).includes(query.trim())))
        }
        else {
            setFilteredItems(sortedItems)
        }
    },[query, sortedItems])


    if(loading) {
        return <div>Loading...</div>
    }

  return (
    <div className={'list-wrapper'}>
        <div className="list-header">
            <h1 className={'list-title'}>Items List</h1>
            <SubTitle>{activeItemText}</SubTitle>
            {isRefreshing && <div className='refreshing-indicator'>Refreshing data...</div>}
            <button onClick={handleSortClick}>Sort ({sortBy === 'ASC' ? 'ASC' : 'DESC'})</button>
            <input type="text" placeholder={'Filter by ID'} value={query} onChange={handleQueryChange} />
        </div>
        <div className="list-container">
            <div className="list">
                {filteredItems.length === 0 && <span>No items found</span>}
                {filteredItems.map((item, index) => (
                    <ListItem
                        key={item.id}
                        isactive={activeItemId===item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        onClick={handleItemClick}
                    />
                ))}
            </div>
        </div>
    </div>
  );
}

export default ListPage;
