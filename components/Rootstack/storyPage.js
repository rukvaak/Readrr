import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { Card, Image, Avatar, ListItem, Icon, Divider } from 'react-native-elements';
import * as Font from 'expo-font';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';
import ViewMoreText from 'react-native-view-more-text';
import ActionButton from 'react-native-action-button';

import RatingComponent from '../Common/Rating';
import AvatarVertical from '../Common/AvatarVertical';
import { default as ImageComponent } from '../Common/ImageComponent';

import { getRequest, postRequest } from '../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Reviews = [
  {
    id: "1",
    Reviewer: "Vanessa",
    review: 'As far as celebrity memoirs go you really get your moneys worth here. I believe if your going to write a tell all memoir you might as well tell the truth and nothing but the truth and this is what Lily Allen does. Her life is a series of big fuck ups and she owns them all, she is a straight shooter and doesn’t mess about with anything that tries to sell a pretty picture. You get real. There is much to feel sad for Lily and she wears all her vulnerabilities on her sleeve it’s hard to feel any criticism. She’s brave and her story adds to the narrative of empowering women to speak up and not feel ashamed. Taking back the power from men, the fakes, the users and the media who have taken so much from her already. Standing up to the haters and owning her story. Gotta love a woman strong enough to do that.'
  },
  {
    id: "2",
    Reviewer: "Monica ",
    review: "Not my usual read. Thought this was going to be more of a gossipy celebrity memoir but Lily Allen tells a very personal story. Especially enjoyed hearing about how she wrote her first song and she has some worthwhile things to say about the way women are treated in our society, not just the music industry. I didn't exactly warm to Lily but I've enjoyed her music over the years and I applaud her refusal to shut the fuck up and be the good little woman."
  },
  {
    id: "3",
    Reviewer: "Becky",
    review: "This book is depressing. Whilst I can't help but admit I buy into the culture of celebrity. As a teen I liked Lily, I bought her first single, queued at New Look to buy her clothing range, I watched her BBC3 show, her show about LucyinDisguise... I switched off when she began taking politics into her own. I think the book is quite sad, and you're not able to compartmentalise the content as that of some complete stranger, you'll end up empathising. Imagine it's a stranger and you might feel differently. Lily doesn't realise how good she's had it, but has always had a penchant for looking at the glass half empty. Stories of a private school and not fitting in, being in a house alone eating pasta, her celebrity stepfather stepping in and being the hero (call Childline!), her first foray into music because of her last name (then yes hard work), her happy marriage she tarnished because she had to be the breadwinner and leave home (Idontgetit). Nothing ever is her fault somehow, and it gets tiring. By the time the strange story of the Calais debacle rolls around and then describing herself going over, high on pills, to physically attack her ex-husband over his new relationship (after everything she had professed?) - I was done, it was toecurling. Morose as it was, other than the loss of a child and a crazed stalker, this book should be about how lucky and fortunate someone has been. Lily's had success, Lily has had a beautiful family and loving Husband. Lily was the last of the pre-digital generation of artists that could muster a label to rent a house in the Cotswolds, kit out her home with a studio and to fly her abroad for music video shoots, helicopter into Glastonbury, grandiose, a Fleetwood Mac lifestyle to someone that happened to someone too young to really appreciate it. I felt like Lily is a lost soul, someone that can never be happy (This can also be me). Live in the moment, appreciate what you have girl."
  }
]

class Storypage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }
  }
  constructor(props) {
    super(props);
    this.rendernavigation = this.rendernavigation.bind(this);
  }

  state = {
    stories: [],
    user_followed: false,
    reviews: Reviews,
    loading: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.storyPageData) {
     // console.log('blogggggggggggggggggggggg:', nextProps.data.storyPageData[0])
      this.setState({ stories: nextProps.data.storyPageData[0],
                      user_followed: nextProps.data.storyPageData[0].user_followed,
                      loading: false
                    })
    } else if (nextProps.data.FollowUnfollowData) {
      console.log('entering once')
  }
  }

  componentWillMount() {
    var body = {};
    body["event"] = "storyPageData"
    body["story_id"] = this.props.route.params.story_id
    actionPayload = {
      route: 'stories',
      body: body,
      token: this.props.token //token is mandatory
    }
    this.props.onRequestUpdate();

  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }


  renderViewMore(onPress) {
    return (
      <Text style={styles.viewmore} onPress={onPress}>{"Read more >"} </Text>
    )
  }

  renderViewLess(onPress) {
    return (
      <Text style={styles.viewmore} onPress={onPress}>{"Show less >"}</Text>
    )
  }

  _handleTextReady = () => {
    // ...
  }

  rendernavigation() {
    this.props.navigation.navigate('Webview',{  content: this.state.stories.story_content,
                                                _id: this.props.route.params.story_id, 
                                                blog_story: false });
  }

  postfollow() {
    var body = {};
    if (this.state.user_followed) {
      this.setState({ user_followed: false })
      body["follow_unfollow"] = false
      // console.log('inside true if', this.state.user_present)
    } else {
      this.setState({ user_followed: true })
      body["follow_unfollow"] = true
      // console.log('inside false if', this.state.user_present)
    }

    body["event"] = "FollowUnfollowData"
    body["author_id"] = this.state.stories.user_id
    actionPayload = {
      route: 'updateuserinfo',
      data: body,
      token: this.props.token //token is mandatory
    }
    // console.log('outside if', actionPayload.data.follow_unfollow)
    this.props.onRequestPostUpdate();
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, justifyContent: "center"}}>
            <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <ImageBackground style={styles.imagebackground} source={require('../../assets/Blogpagebackground.png')}>
            <View style={{paddingTop: 20}}>
              <Text style={styles.textmain}>
                {this.state.stories.story_title}
                    </Text>
              {/* <Divider style={styles.Divider} />
              <Text style={styles.textmain}>
                'An unflinching, unputdownable book'
                    </Text> */}
            </View>
            <View style={styles.screen}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column', paddingTop: screenHeight * 0.3 }}>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <RatingComponent rating={this.state.stories.story_totalRating}/>
                    </View>
                    <View>
                      <Text style={{ color: 'gray', textAlign: 'center' }}>
                      {this.state.stories.story_totalRating+" Rating"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.item}>
                  <ImageComponent image={this.state.stories.story_image} /> 
                </View>
                <View style={{ flex: 1, flexDirection: 'column', paddingTop: screenHeight * 0.3, paddingLeft: 20 }}>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Icon name="visibility" color='gray' size={25} />
                      <Text style={{ paddingLeft: 5, color: 'gray' }}>
                      {this.state.stories.story_numberRating}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: 'gray', textAlign: 'center' }}>
                        {"Reviews"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.textinner}>
                Description
                </Text>
              <Card containerStyle={styles.card}>
                <ViewMoreText
                  numberOfLines={3}
                  renderViewMore={this.renderViewMore}
                  renderViewLess={this.renderViewLess}
                  textStyle={{ textAlign: 'justify' }}
                >
                  <Text style={{ color: '#ffffff', fontSize: 18, textAlign: 'justify' }}>
                    {this.state.stories.story_text}
                        </Text>
                </ViewMoreText>
              </Card>
            </View>
            <View style={{ paddingTop: 10 }}>
            <Text style={styles.textinner}>
                Written By
                </Text>
                <Grid style={styles.avatar}>
                <Col style={{ justifyContent: 'center' }}>
                  <Avatar rounded size='large' source={{ uri: this.state.stories.user_profile_pic }} />
                </Col>
                <Col style={{ justifyContent: 'center' }}>
                  <Text style={styles.avatartitle}>
                    {this.state.stories.user_name}
                  </Text>
                </Col>
                <Col style={{ justifyContent: 'center' }}>
                  <TouchableOpacity
                    style={styles.avatarButtonStyle}
                    activeOpacity={0.5}
                    onPress={() => this.postfollow()}
                  >
                    <Text style={styles.avatarButtonText}>
                      {this.state.user_followed ? 'Following' : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                </Col>
              </Grid>
              <Text style={styles.textinner}>
                Reviews
                </Text>
              <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.reviews}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                  <Card containerStyle={styles.viewreview}>
                    <ViewMoreText
                      numberOfLines={5}
                      renderViewMore={this.renderViewMore}
                      renderViewLess={this.renderViewLess}
                      textStyle={{ textAlign: 'justify' }}
                    >
                      <Text style={{ color: 'gray', fontSize: 18, textAlign: 'justify' }}>
                        {item.review}
                      </Text>
                    </ViewMoreText>
                  </Card>
                }
              />
            </View>
            <ActionButton
              buttonText="READ"
              buttonTextStyle={{ fontSize: 12, fontWeight: 'bold' }}
              position="center"
              bgColor="transparent"
              size={70}
              buttonColor="rgba(231,76,60,1)"
              onPress={() => this.rendernavigation()}
            />
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  viewmore: {
    color: '#0066ff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  textmain: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: (screenWidth * 20) / 100,
    paddingTop: 15
  },
  textinner: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'auto',
    paddingTop: 10,
    paddingLeft: 15
  },
  Divider: {
    backgroundColor: 'black',
    height: 2,
    marginHorizontal: screenWidth * 0.4,
    margin: 5
  },
  TextBold: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20
  },
  card: {
    top: 0,
    backgroundColor: '#817cb7',
    borderRadius: 20
  },
  viewreview: {
    top: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    flexWrap: 'wrap',
    width: screenWidth * 0.8
  },
  title: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  ButtonStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#5abd8c',
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 20,
    width: 100,
    height: 30
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#ffffff'
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 20
  },
  item: {
    width: (screenWidth * 45) / 100,
    height: (screenHeight * 35) / 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: 10,
    alignSelf: 'center'
  },
  imagebackground: {
    flex: 1,
    resizeMode: "cover"
  },
  avatar: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '5%'
  },
  avatartitle: {
    paddingTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    textAlign: 'center'
  },
  avatarButtonStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#5abd8c',
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 20,
    width: 100,
    height: 30
  },
  avatarButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#ffffff'
  },
}
);

const mapStateToProps = (state, props) => {
  return {
    store: state.store,
    loading: true,
    data: state.items,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestUpdate: () => dispatch(getRequest(actionPayload)),
    onRequestPostUpdate: () => dispatch(postRequest(actionPayload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Storypage);
