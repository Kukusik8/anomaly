import { useMemo, useState } from 'react';

function useSort(items: any[]): [any[], any, any] {
	const [sortBy, setSortBy] = useState('ASC');
	
	const sortedItems = useMemo(() => {
		if (sortBy === 'DESC') {
			return [...items].sort((a,b) => b.id - a.id);
		}
		
		if (sortBy === 'ASC') {
			return [...items].sort((a, b) => b.id - a.id)
		}
		
		return items;
	}, [items, sortBy]);
	
	const handleSortClick = () => setSortBy(prev => (prev === 'ASC' ? 'DESK' : 'ASC'))
	
	return [sortedItems, sortBy, handleSortClick]
}

export default useSort;
