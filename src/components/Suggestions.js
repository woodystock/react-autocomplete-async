import React from "react"

const Suggestions = React.memo( function WrappedComponent({suggestions, selectSuggestion}) {
    return (<>
        {suggestions.slice(0, 10).map((suggestion, index) =>
            <div key={index}
                className="suggestion"
                onClick={event => {
                    selectSuggestion(suggestion.name)
                }}>{suggestion.name}</div>
        )}
    </>)
})

export default Suggestions