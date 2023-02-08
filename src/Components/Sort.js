import { Button, ButtonGroup } from "@mui/material"

const Sort = ({fn}) => {
    return <div>
        <ButtonGroup>
            <Button onClick={() => fn()}>Price (asc)</Button>
            <Button onClick={() => fn('desc')}>Price (desc)</Button>
        </ButtonGroup>
    </div>
}

export default Sort