import {path} from "../config";
import {googleLogin} from "./ajax";

const googleAuth = '/auth/google/callback';

export default (props) => {
    let currentPath = props.location.pathname;
    if (currentPath === path.login) {        
        redirectDashboardOrSetup(props);
    }
};

const redirectDashboardOrSetup = (props) => {
    if (window.location.pathname === googleAuth) {
        window.history.pushState({},'Home','/#/auth/google/callback' + window.location.search);
        return;
    } else {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            props.history.push(path.home);
            window.history.pushState({},'Home','/');
        }
    }
};