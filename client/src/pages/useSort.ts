import { useMemo, useState } from 'react';

type SortTo = 'ASC' | 'DESC'

interface Sortable {
	id:number
}

function useSort<T extends Sortable>(items: T[]): [T[], SortTo, () => void] {
	const [sortBy, setSortBy] = useState<SortTo>('ASC');
	
	const sortedItems = useMemo(() => {
		if (sortBy === 'DESC') {
			return [...items].sort((a,b) => b.id - a.id);
		}
		
		if (sortBy === 'ASC') {
			return [...items].sort((a, b) => a.id - b.id)
		}
		
		return items;
	}, [items, sortBy]);
	
	const handleSortClick = () => setSortBy(prev => (prev === 'ASC' ? 'DESC' : 'ASC'))
	
	return [sortedItems, sortBy, handleSortClick]
}

export default useSort;
