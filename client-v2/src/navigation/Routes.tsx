
import { Redirect, Route, Switch } from "wouter";
import { ToastContainer } from 'react-toastify';
import Authentication from "../components/Authentication";
import InitialDataLoader from "../components/InitialDataLoader";
import OnboardingRedirect from "../components/OnboardingRedirect";

import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import OnboardingPage from "../pages/OnboardingPage";
import AssessmentsPage from "../pages/AssessmentsPage";
import Layout from "../components/Layout";

export default function Routes() {
  return (
		<Layout>
			<InitialDataLoader>
				<Switch>
					<Route path="/privacy-policy" component={() => <h1>hola</h1>} />
					<Route path="/register" component={
						() => (
							<Authentication isPublic>
								<RegisterPage />
							</Authentication>
						)
					} />
					<Route path="/assessments" component={
						() => (
							<Authentication>
								<OnboardingRedirect>
									<AssessmentsPage />
								</OnboardingRedirect>
							</Authentication>
						)
					} />
					<Route path="/onboarding" component={
						() => (
							<Authentication>
								<OnboardingPage />
							</Authentication>
						)
					} />
					<Route path="/" component={
						() => (
							<Authentication>
								<OnboardingRedirect>
									<HomePage />
								</OnboardingRedirect>
							</Authentication>
						)
					} />
					<Redirect to="/" />
				</Switch>
			</InitialDataLoader>

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
		</Layout>
  );
}
