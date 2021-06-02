import React, {useCallback} from "react";
import {Button, TableCell, TableRow} from '@material-ui/core/';
import {useSelector} from "react-redux";
import {
	selectAccountIsRegistered,
	selectAccountLpBalance,
	selectAccountLpMonitorBalance,
	selectIsLpMonitorBalanceUpToDate,
	selectIsPromotionRunning,
	registerAccount,
	updateLPMonitor, selectAccountAddress
} from "../../store/slices/accountSlice";
import {useWeb3} from "../../hooks/useWeb3";

const NotRegistered: React.FC = () => {
	const address = useSelector(selectAccountAddress);
	const {web3} = useWeb3();
	const register = useCallback(()=>registerAccount({address, web3}), [address, web3]);
	return <TableRow>
		<TableCell>
			You have not registered for liquidity rewards yet.
		</TableCell>
		<TableCell>
			<Button onClick={register} color="primary" variant="contained">Register now</Button>
		</TableCell>
	</TableRow>;
};

const Registered: React.FC = () => {
	const lpMonitorBalance = useSelector(selectAccountLpMonitorBalance);
	return <>
		<TableRow>
			<TableCell colSpan={2}>
				Your address has been registered for liquidity rewards.
			</TableCell>
		</TableRow>
		<TableRow>
			<TableCell>$SCAM LP tokens registered for rewards:</TableCell>
			<TableCell>{lpMonitorBalance}</TableCell>
		</TableRow>
	</>;
};

const LPBalance: React.FC = () => {
	const lpBalance = useSelector(selectAccountLpBalance);
	return <TableRow>
		<TableCell>$SCAM LP tokens:</TableCell>
		<TableCell>{lpBalance}</TableCell>
	</TableRow>;
};

const LPMonitor: React.FC = () => {
	const isRegistered = useSelector(selectAccountIsRegistered);
	return isRegistered ? <Registered /> : <NotRegistered />;
};

const Update: React.FC = () => {
	const address = useSelector(selectAccountAddress);
	const {web3} = useWeb3();
	const update = useCallback(()=>updateLPMonitor({address, web3}), [address, web3]);
	return <TableRow>
		<TableCell>
			It looks like you have some LP tokens that are not registered for rewards.<br />
			You can fix that by running an update.<br />
			You can also check back in ~24 hours, we run an update for you every day.<br />
		</TableCell>
		<TableCell>
			<Button onClick={update} color="primary" variant="contained">Update</Button>
		</TableCell>
	</TableRow>;
};

export const LPRewards: React.FC = () => {
	const isPromotionRunning = useSelector(selectIsPromotionRunning);
	const isLpMonitorBalanceUpToDate = useSelector(selectIsLpMonitorBalanceUpToDate);
	return <>
		<LPBalance />
		<LPMonitor />
		{isPromotionRunning && isLpMonitorBalanceUpToDate && <Update />}
	</>;
}
