import React, { useState, useEffect } from 'react'
import { SearchIcon, SearchMainContainer, SearchTextField } from './SearchStyledComponents'
import SearchLight from '../../assets/search.png'
import SearchDark from '../../assets/searchDark.png'
import CancelDark from '../../assets/cancelDark.png'
import CancelLight from  '../../assets/cancelLight.png'
const Search = ({ dark, didTapSearch }) => {
    const [searchQuery, setQuery] = useState("")
    const [showIcon, setShowIcon] = useState(true)

    const searchClicked = () => {
        setShowIcon(false)
        didTapSearch(true, searchQuery)
    }

    const cancelClicked = () => {
        setShowIcon(true)
        didTapSearch(false)
        setQuery("")
    }
 
    return (
        <>
            <SearchMainContainer dark={dark}>
                <SearchTextField type="text" placeholder='Please Search here...' name="query" value={searchQuery} onChange={e => setQuery(e.target.value)} required />
                <SearchIcon isHidden={!showIcon} isDisabled={!searchQuery} onClick={searchClicked} src={dark ? SearchLight : SearchDark} />
                <SearchIcon isHidden={showIcon} isDisabled={!searchQuery} onClick={cancelClicked} src={dark ? CancelDark : CancelLight} />
            </SearchMainContainer>
        </>
    )
}

export default Search