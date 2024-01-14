
import { Redirect, Route, Switch } from "wouter";
import { ToastContainer } from 'react-toastify';

import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import Authentication from "../components/Authentication";
import InitialDataLoader from "../components/InitialDataLoader";
import OnboardingRedirect from "../components/OnboardingRedirect";
import OnboardingPage from "../pages/OnboardingPage";
import Loading from "../components/Loading";

export default function Routes() {
  return (
		<div>
			<Switch>
				<Route path="/privacy-policy" component={() => <h1>hola</h1>} />
				<Route path="/register" component={
					() => (
						<Authentication isPublic>
							<RegisterPage />
						</Authentication>
					)
				} />
				<Route path="/onboarding" component={
					() => (
						<Authentication>
							<InitialDataLoader>
								<OnboardingPage />
							</InitialDataLoader>
						</Authentication>
					)
				} />
				<Route path="/" component={
					() => (
						<Authentication>
							<InitialDataLoader>
								<OnboardingRedirect>
									<HomePage />
								</OnboardingRedirect>
							</InitialDataLoader>
						</Authentication>
					)
				} />
				<Redirect to="/" />
			</Switch>
			{/* @ts-ignore */}
			<ToastContainer
				position='top-right'
				theme="dark"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
  );
}
