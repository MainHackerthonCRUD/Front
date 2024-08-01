import PropTypes from 'prop-types';
import styled from 'styled-components';

const SuggestionsDropdown = ({ suggestions, selectedidx, onSuggestionClick, setSelectedIdx }) => {
    return (
        <SuggestionsContainer>
            {suggestions.map((suggestion, index) => (
                <SuggestionItem 
                    key={index}
                    selected={index === selectedidx}
                    onMouseEnter={() => setSelectedIdx(index)}
                    onClick={() => onSuggestionClick(suggestion)}>
                    <a>
                        {suggestion.hospital_name} ({suggestion.gu})
                    </a>
                </SuggestionItem>
            ))}
        </SuggestionsContainer>
    );
};

SuggestionsDropdown.propTypes = {
    suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            hospital_name: PropTypes.string.isRequired,
            gu: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedidx: PropTypes.number.isRequired,
    onSuggestionClick: PropTypes.func.isRequired,
    setSelectedIdx: PropTypes.func.isRequired
};

const SuggestionsContainer = styled.div`
    position: absolute;
    top: 80px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    z-index: 1000;
`;

const SuggestionItem = styled.div`
    padding: 10px;
    cursor: pointer;
    background-color: ${props => props.selected ? '#FECD55' : 'transparent'};

    &:hover {
        background-color: #FECD55;
    }
`;

export default SuggestionsDropdown;