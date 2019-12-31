/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Poster from "../../../src/Components/Poster";
import Section from "../../../src/Components/Section";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;
const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 10px;
`;

const ImdbLink = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 6rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  text-align: center;

  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

const ProductionImage = styled.img`
  width: 100px;
  height: 100px;
`;

const NoImg = styled.div`
  height: 100px;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
`;

const ProductionName = styled.span`
  display: block;
  margin-bottom: 3px;
  margin-top: 3px;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      ></Backdrop>

      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("D:/NomadReactjs/nomflix/src/assets/noPosterSmall.JPG")
          }
        ></Cover>
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>*</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>*</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>

            {result.imdb_id ? (
              <>
                <Divider>*</Divider>
                <Item>
                  <ImdbLink
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                  >
                    IMDB LINK
                  </ImdbLink>
                </Item>
              </>
            ) : (
              ""
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Tabs>
            <TabList>
              {result.videos ? <Tab>Video</Tab> : ""}
              <Tab>Production</Tab>
            </TabList>

            {result.videos ? (
              <TabPanel>
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </TabPanel>
            ) : (
              ""
            )}

            <TabPanel>
              <Grid>
                {result.production_companies.map(production =>
                  production.logo_path ? (
                    <ImageContainer>
                      <ProductionImage
                        src={`https://image.tmdb.org/t/p/original${production.logo_path}`}
                      ></ProductionImage>
                      <ProductionName>{production.name}</ProductionName>
                    </ImageContainer>
                  ) : (
                    <ImageContainer>
                      <NoImg
                        bgImage={require("../../assets/noPosterSmall.JPG")}
                      ></NoImg>
                      <ProductionName>{production.name}</ProductionName>
                    </ImageContainer>
                  )
                )}
              </Grid>
            </TabPanel>
          </Tabs>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
