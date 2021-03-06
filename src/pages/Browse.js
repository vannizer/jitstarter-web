import React from 'react'
import styled from 'styled-components'
import { graphql, gql } from 'react-apollo'
import { Layout, Spin, Progress } from 'antd'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
const { Content } = Layout


const CampaignContainer = styled.div`
  min-width: 25%;
  flex: 1;
  padding: 8px;
  max-width: 25%;
`

const CampaignInner = styled.div`
background: #fff;
border: 1px solid #ddd;
border-radius: 3px;
`

const ImageContainer = styled.div`
  position: relative;
  padding-top: 66.6667%;
  background: rgb(216, 216, 216);
`

const ImageAbs = styled.div`
position: absolute;
top: 0px;
bottom: 0px;
left: 0px;
right: 0px;
height: 100%;
width: 100%;
background: transparent url(${props => props.src});
background-size: cover;
background-position: center;
`

const CampaignImageDiv = styled.div`
  width: 100%;
  background: transparent url(${props => props.src})
`

const CardBody = styled.div`
  padding: 16px;
`

const CardTitle = styled.h4`
font-size: 18px;
margin: 0;
padding: 0;
`

const CardBy = styled.p`
margin: 0;
padding: 0;
`

const CampaignItem = (props) => {
  const { campaign } = props
  let percent = 0
  if (campaign.minimumGoal === 0) {
    percent = 100
  } else if (campaign.current === 0) {
    percent = 0
  }  else {
    const _percent = (campaign.current / campaign.minimumGoal * 100).toFixed('0.00')
    if (_percent > 100) {
      percent = 100
    } else {
      percent = _percent
    }
  }

  return (
    <CampaignContainer>
      <CampaignInner>
        <Link to={'/campaign/' + campaign.id}>
        <ImageContainer>
          { campaign.images.length > 0 ? <ImageAbs src={campaign.images[0]} /> : null }
        </ImageContainer>
        <CardBody>
          <CardTitle>{campaign.name}</CardTitle>
          <CardBy>by {campaign.creator ? campaign.creator.name : 'unknonwn'}</CardBy>
          <Progress percent={percent} strokeWidth={5} />
        </CardBody>
        </Link>
      </CampaignInner>
    </CampaignContainer>
  )
}

class Browse extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loading />
    }
    return (
      <Content style={{ padding: '50px 50px', display: 'flex', direction: 'row', flexWrap: 'wrap' }}>
        {this.props.data.campaigns.map((campaign, index) => {
          return <CampaignItem key={index} campaign={campaign} />
        })}
      </Content>
    )
  }
}


const listCampaign = gql`
  query listCampaign {
    campaigns {
      id
      name
      creator {
        id
        name
        picture
      }
      goalType,
      minimumGoal,
      maximumGoal,
      current,
      endDate,
      startDate,
      isUnlimit,
      images
    }
  }
`

export default graphql(listCampaign)(Browse)

