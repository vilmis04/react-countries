export default function Filters (props) {
    

    return (
    <>
        <div className="inputs">
            <div className="filters">
                <select name='filterByRegion' id='filterByRegion' onChange={props.handleFilters}>
                    <option value="">Filter by region</option>
                    {props.regions && props.regions.map(region =>
                    <option value={region} key={region}>{region}</option>
                    )}
                </select>
                <select name='filterByArea' id='filterByArea' onChange={props.handleFilters}>
                    <option value="">Filter by area</option>
                    <option value="larger">Larger than Lithuania</option>
                    <option value="smaller">Smaller than Lithuania</option>
                </select>
            </div>
            <select name='sort' id='sort' onChange={props.handleFilters}>
                <option value="asc">Ascending</option>
                <option value="dsc">Descending</option>
            </select>
        </div>
    </>
    );
}