import { Slider } from "@mui/material"

const Filter = ({currentValue, onChange}) => {
    return <div>
        <Slider
            size="large"
            value={currentValue}
            onChange={onChange}
            max={400}
            step={10}
            valueLabelDisplay='auto'
        />
        <p>Minimum price: ${currentValue}</p>
    </div>
}

export default Filter