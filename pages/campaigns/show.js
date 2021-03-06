import React, { Component } from 'react';
import { Card, Grid, Button,Divider } from 'semantic-ui-react';
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return { 
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4] 
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta:'Address of Manager',
                description: 'The manager created this project and can create request to project',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei) ',
                description: 'You must contribute at least this much wei to become an approver'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money'
            },
            {
                header: approversCount,
                meta: 'approversCount ',
                description: 'approversCount'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance(ether)',
                description: 'The balance is how much money this campaign'
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {        
        return (
            <Layout>
                <Divider />
                <h3>Project Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            { this.renderCards() }                                
                        </Grid.Column>                  
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>   
                    </Grid.Row>                 
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Request</Button>
                                </a>    
                            </Link>
                        </Grid.Column>
                    </Grid.Row>    
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;
