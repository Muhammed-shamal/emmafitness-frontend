import { getSeason, } from '../utility/Season/getSeason'
import {seasonThemes} from '../utility/Season/seasonTheme'

const SeasonalHeader = () => {
    const season = getSeason();
    const theme = seasonThemes[season];

    return (
        <div className={`w-full h-[100px] bg-gradient-to-r ${theme.gradient} rounded-md shadow-md flex items-center justify-center px-3`}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-wider relative">
                TRENDING THIS <span className={`${theme.textColor} animate-pulse`}>{season.toUpperCase()} {theme.emoji}</span>
            </h2>
        </div>
    );
};

export default SeasonalHeader;