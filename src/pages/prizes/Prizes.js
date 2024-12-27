import React, { useEffect, useMemo, useState } from 'react';
import qs from 'qs';
import Badge from '@atlaskit/badge';

import { Tabs, Card } from '@wedgekit/core';
import Layout from '@wedgekit/layout';
import { Text, Title } from '@wedgekit/primitives';
import { Wedge } from '@wedgekit/illustrations';
import { IconWidth } from '@wedgekit/icons';

import history from '../../utils/history';

import Categories from './categories';
import UserHeader from '../../components/header';
import { Prize } from '../';
import HeaderRight from '../../components/headerRight';

import BadgeContainer from './styled/BadgeContainer';
import CardContent from './styled/CardContent';
import Container from './styled/Container';
import ContentWrapper from './styled/ContentWrapper';
import Footer from './styled/Footer';
import FooterText from './styled/FooterText';
import Header from './styled/Header';
import ImageWrapper from './styled/ImageWrapper';
import Scroll from './styled/Scroll';
import TabContainer from './styled/TabContainer';

import Tutorial from './Tutorial';

const handleTabChange = (view, e) => {
  e.preventDefault();
  history.push(`/prizes?${qs.stringify({ view })}`);
};

const hidePrize = () => {
  const params = qs.parse(history.location.search.replace('?', ''));
  delete params.prizeId;
  history.push(`/prizes?${qs.stringify(params)}`);
};

const openCategory = (category) => {
  const params = qs.parse(history.location.search.replace('?', ''));
  history.push(
    `/prizes?${qs.stringify({
      ...params,
      categoryId: category.id,
    })}`,
  );
};

const openPrize = (prizeId) => () => {
  const params = qs.parse(history.location.search.replace('?', ''));
  history.push(
    `/prizes?${qs.stringify({
      ...params,
      prizeId,
    })}`,
  );
};

const SORT_ORDER = {
  NAME_ASC: 0,
  NAME_DESC: 1,
  TICKET_ASC: 2,
  TICKET_DESC: 3,
  TICKET_PER_PRIZE_ASC: 4,
  TICKET_PER_PRIZE_DESC: 5,
  AVG_TICKET_ASC: 6,
  AVG_TICKET_DESC: 7,
};

const sortName = (ascending) => (a, b) =>
  a.title.toLowerCase().localeCompare(b.title.toLowerCase()) * (ascending ? 1 : -1);
const sortTickets = (ascending) => (a, b) => {
  const aTix = a.committedTickets;
  const bTix = b.committedTickets;
  return aTix === bTix ? sortName(ascending)(a, b) : (aTix < bTix ? 1 : -1) * (ascending ? 1 : -1);
};
const sortTicketsPerPrize = (ascending) => (a, b) => {
  const aTix = a.committedTickets / a.multiplier;
  const bTix = b.committedTickets / b.multiplier;
  return aTix === bTix ? sortName(ascending)(a, b) : (aTix < bTix ? 1 : -1) * (ascending ? 1 : -1);
};
const sortAvgTickets = (ascending) => (a, b) => {
  const aTix = a.committedTickets / a.committedUsers;
  const bTix = b.committedTickets / b.committedUsers;
  return aTix === bTix ? sortName(ascending)(a, b) : (aTix < bTix ? 1 : -1) * (ascending ? 1 : -1);
};

export default ({ categories, prizes: propPrizes, refresh, ticketsRemaining, userPrizes }) => {
  const queryParams = qs.parse(history.location.search.replace('?', ''));
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.NAME_ASC);
  const categoryNames = [
    'Electronics',
    'Travel',
    'Home',
    'Events',
    'Garage',
    'Kitchen',
    'Misc.',
    'Outdoor',
  ];
  const prizes = useMemo(() => {
    return (queryParams.view === 'mine' ? userPrizes : propPrizes).slice().sort(
      (() => {
        switch (sortOrder) {
          case SORT_ORDER.NAME_DESC:
            return sortName(false);
          case SORT_ORDER.TICKET_ASC:
            return sortTickets(true);
          case SORT_ORDER.TICKET_DESC:
            return sortTickets(false);
          case SORT_ORDER.TICKET_PER_PRIZE_ASC:
            return sortTicketsPerPrize(true);
          case SORT_ORDER.TICKET_PER_PRIZE_DESC:
            return sortTicketsPerPrize(false);
          case SORT_ORDER.AVG_TICKET_ASC:
            return sortAvgTickets(true);
          case SORT_ORDER.AVG_TICKET_DESC:
            return sortAvgTickets(false);
          default:
            return sortName(true);
        }
      })(),
    );
  }, [sortOrder, queryParams.view, propPrizes]);

  const [showTutorial, setShowTutorial] = useState(
    queryParams.prizeId === undefined && userPrizes.length === 0,
  );
  useEffect(() => {
    const handle = setInterval(() => {
      refresh();
      // Reload every 5 minutes
    }, 300000);

    return () => {
      clearInterval(handle);
    };
  }, []);

  const ScrollHeader = () => (
    <Layout.Grid columns={['minmax(0, 1fr)', 'minmax(0, max-content)']} areas={[]}>
      <div style={{ marginBottom: '12px' }}>
        <Title level={2} elementLevel={2}>
          {(() => {
            switch (queryParams.view) {
              case 'all':
                return 'All Prizes';
              case 'mine':
                return 'My Selections';
              default: {
                if (queryParams.categoryId) {
                  return categoryNames[queryParams.categoryId - 1];
                } else {
                  return 'All Categories';
                }
              }
            }
          })()}
        </Title>
      </div>
      {(queryParams.view !== 'categories' || !!queryParams.categoryId) && (
        <div
          style={{ marginBottom: '12px' }}
          onClick={() =>
            setSortOrder(
              (o) =>
                (o + 1) %
                (Object.values(SORT_ORDER).length - (queryParams.view === 'mine' ? 2 : 0)),
            )
          }
        >
          <Title level={3} elementLevel={3}>
            {(() => {
              switch (sortOrder) {
                case SORT_ORDER.NAME_DESC:
                  return 'Name ↑';
                case SORT_ORDER.TICKET_ASC:
                  return 'Tickets ↓';
                case SORT_ORDER.TICKET_DESC:
                  return 'Tickets ↑';
                case SORT_ORDER.TICKET_PER_PRIZE_ASC:
                  return 'Tickets/Prize ↓';
                case SORT_ORDER.TICKET_PER_PRIZE_DESC:
                  return 'Tickets/Prize ↑';
                case SORT_ORDER.AVG_TICKET_ASC:
                  return 'Avg Tickets ↓';
                case SORT_ORDER.AVG_TICKET_DESC:
                  return 'Avg Tickets ↑';
                default:
                  return 'Name ↓';
              }
            })()}
          </Title>
        </div>
      )}
    </Layout.Grid>
  );
  const TicketCount = ({ prize }) => {
    if (sortOrder === SORT_ORDER.AVG_TICKET_ASC || sortOrder === SORT_ORDER.AVG_TICKET_DESC) {
      return (
        <>
          <Text>Tickets per User:</Text>
          <BadgeContainer>
            <Badge max={null}>
              {Math.floor((prize.committedTickets / prize.committedUsers) * 100) / 100}
            </Badge>
          </BadgeContainer>
        </>
      );
    } else if (queryParams.view === 'all') {
      return (
        <>
          <Text>Total Tickets in Bucket:</Text>
          <BadgeContainer>
            <Badge max={null}>{prize.committedTickets}</Badge>
          </BadgeContainer>
        </>
      );
    } else {
      return (
        <>
          <Text>My Tickets in Bucket:</Text>
          <BadgeContainer>
            <Badge max={null}>{prize.committedTickets}</Badge>
          </BadgeContainer>
        </>
      );
    }
  };

  return (
    <>
      <Container columns={[1]} areas={[]} multiplier={2} rows={['minmax(0, max-content)', 1]}>
        <Header>
          <Layout.Grid
            columns={['repeat(2, minmax(0, max-content))']}
            areas={[]}
            multiplier={2}
            align="center"
          >
            <IconWidth iconWidth={32}>
              <Wedge />
            </IconWidth>
            <Text>
              <strong>{document.title}</strong>
            </Text>
          </Layout.Grid>
          <HeaderRight />
        </Header>
        <Scroll>
          <ContentWrapper>
            <UserHeader />
            <Layout.Grid columns={[1]} areas={[]} multiplier={3}>
              <TabContainer>
                <Tabs value={queryParams.view || 'categories'} onChange={handleTabChange}>
                  {[
                    { id: 'categories', label: 'Categories', href: '/prizes?view=categories' },
                    { id: 'all', label: 'All Prizes', href: '/prizes?view=all' },
                    { id: 'mine', label: 'My Entries', href: '/prizes?view=mine' },
                  ]}
                </Tabs>
                <Text>
                  Tickets remaining: <Badge max={null}>{ticketsRemaining}</Badge>
                </Text>
              </TabContainer>
              {queryParams.view === 'categories' || !queryParams.view ? (
                <div style={{ paddingBottom: '10vh' }}>
                  <ScrollHeader />
                  {queryParams.categoryId ? (
                    <Layout.Grid
                      columns={['repeat(auto-fill, minmax(200px, 0.5fr))']}
                      areas={[]}
                      multiplier={2}
                    >
                      {prizes
                        .filter(
                          (prize) => prize.categoryId === parseInt(queryParams.categoryId, 10),
                        )
                        .map((prize) => (
                          <Card key={prize.id} onClick={openPrize(prize.id)}>
                            <CardContent
                              columns={[1]}
                              areas={[]}
                              multiplier={2}
                              rows={['minmax(0, max-content)', 1, 'minmax(0, max-content)']}
                            >
                              <div>
                                <ImageWrapper>
                                  {/* Hide when showing tutorial due to coloration issues */}
                                  {!showTutorial && prize.multiplier && prize.multiplier > 1 && (
                                    <p>x{prize.multiplier}</p>
                                  )}
                                  <img src={prize.image} alt={prize.title} />
                                </ImageWrapper>
                                <Title level={3} elementLevel={3}>
                                  {prize.title}
                                </Title>
                              </div>
                              <div />
                              <Layout.Grid
                                columns={['repeat(2, minmax(0, max-content))']}
                                areas={[]}
                                align="end"
                              >
                                <TicketCount prize={prize} />
                              </Layout.Grid>
                            </CardContent>
                          </Card>
                        ))}
                    </Layout.Grid>
                  ) : (
                    <Categories categories={categories} onClick={openCategory} />
                  )}
                </div>
              ) : (
                <ScrollHeader />
              )}
              {(queryParams.view === 'all' || queryParams.view === 'mine') && (
                <div style={{ paddingBottom: '10vh' }}>
                  <Layout.Grid
                    columns={['repeat(auto-fill, minmax(200px, 0.5fr))']}
                    areas={[]}
                    multiplier={2}
                  >
                    {prizes.map((prize) => (
                      <Card key={prize.id} onClick={openPrize(prize.id)}>
                        <CardContent
                          columns={[1]}
                          areas={[]}
                          multiplier={2}
                          rows={['minmax(0, 1fr)', '0', 'auto']}
                        >
                          <div>
                            <ImageWrapper>
                              {/* Hide when showing tutorial due to coloration issues */}
                              {!showTutorial && prize.multiplier && prize.multiplier > 1 && (
                                <p>x{prize.multiplier}</p>
                              )}
                              <img src={prize.image} alt={prize.title} />
                            </ImageWrapper>
                            <Title level={3} elementLevel={3}>
                              {prize.title}
                            </Title>
                          </div>
                          <div />
                          <Layout.Grid
                            columns={['repeat(2, minmax(0, max-content))']}
                            areas={[]}
                            align="end"
                          >
                            <TicketCount prize={prize} />
                          </Layout.Grid>
                        </CardContent>
                      </Card>
                    ))}
                  </Layout.Grid>
                </div>
              )}
            </Layout.Grid>
            {queryParams.prizeId && <Prize id={queryParams.prizeId} onExit={hidePrize} />}
            <Footer>
              <FooterText>
                Built{' '}
                <span role="img" aria-label="Fast and Powerful">
                  ⚡️
                </span>{' '}
                with <strong>WedgeKit</strong>
              </FooterText>
            </Footer>
          </ContentWrapper>
        </Scroll>
      </Container>
      {showTutorial && <Tutorial onExit={() => setShowTutorial(false)} />}
    </>
  );
};
