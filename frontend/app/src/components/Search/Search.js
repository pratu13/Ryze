import React, { useState, useEffect } from 'react'
import { SearchIcon, SearchMainContainer, SearchTextField, SortContainer, SortName } from './SearchStyledComponents'
import SearchLight from '../../assets/search.png'
import SearchDark from '../../assets/searchDark.png'
import CancelDark from '../../assets/cancelDark.png'
import CancelLight from '../../assets/cancelLight.png'

import DateSortLight from '../../assets/dateSortLight.png'
import DateSortDark from '../../assets/dateSortDark.png'

import NameSortLight from '../../assets/sortNameLight.png'
import NameSortDark from '../../assets/sortNameDark.png'

const Search = ({ dark, didTapSearch }) => {
    const [searchQuery, setQuery] = useState("")
    const [showIcon, setShowIcon] = useState(true)

    const [sort, setSort] = useState(false)

    const searchClicked = () => {
        setShowIcon(false)
        if (sort) {
            didTapSearch(true, searchQuery, "date")
        } else {
            didTapSearch(true, searchQuery, "name")
        }

    }
    
    const sortClicked = () => {
        setSort(!sort)
    }

    const cancelClicked = () => {
        setShowIcon(true)
        didTapSearch(false)
        setQuery("")
        setSort(false)
    }
 
    return (
        <>
            <SearchMainContainer dark={dark}>
                <SortContainer>
                    <SearchIcon isDisabled={!searchQuery} onClick={sortClicked} src={dark ? (sort ? DateSortLight : NameSortLight) : (sort ? DateSortDark : NameSortDark)} />
                    <SortName> {sort ? "Sort by date" : "Sort by name"} </SortName>
                </SortContainer>
                <SearchTextField type="text" placeholder='Please Search here...' name="query" value={searchQuery} onChange={e => setQuery(e.target.value)} required />
                <SearchIcon isHidden={!showIcon} isDisabled={!searchQuery} onClick={searchClicked} src={dark ? SearchLight : SearchDark} />
                <SearchIcon isHidden={showIcon} isDisabled={!searchQuery} onClick={cancelClicked} src={dark ? CancelDark : CancelLight} />
            </SearchMainContainer>
        </>
    )
}

export default Search