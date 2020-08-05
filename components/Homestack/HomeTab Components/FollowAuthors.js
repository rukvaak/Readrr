import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Image, Avatar } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

import { default as TopicTitle } from '../../Common/TopicTitle';

import { getRequest, postRequest } from '../../../Services/data-service';
import { connect } from 'react-redux';
let actionPayload;

const { width: screenWidth } = Dimensions.get('window');

class FollowAuthors extends React.Component {

    constructor(props) {
        super(props);
        this.postfollow = this.postfollow.bind(this);
    }

    state = {
        loading: true
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.FollowUnfollowData) {
            console.log('enter once followauthors')
        //   var body = {};
        //   body["event"] = "quoteData"
        //   actionPayload = {
        //     route: 'quotes',
        //     body: body,
        //     token: this.props.token //token is mandatory
        //   }
        //   this.props.onRequestUpdate();
    
        }
      }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        this.setState({ loading: false })
    }

    postfollow(item) {
        var body = {};
        if (item.user_followed) {
          item.user_followed = false
          body["follow_unfollow"] = false
          // console.log('inside true if', this.state.user_present)
        } else {
          item.user_followed = true
          body["follow_unfollow"] = true
          // console.log('inside false if', this.state.user_present)
        }
    
        body["event"] = "FollowUnfollowData"
        body["author_id"] = item._id
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
                <View></View>
            );
        }
        return (
            <View style={styles.screen}>
                <TopicTitle topictitle="Follow Authors" />
                <FlatList
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.followauthors}
                    renderItem={({ item }) =>
                        <Card style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: screenWidth/4 }}>
                                <Avatar rounded size='large' source={{ uri: item.profile_pic }} />
                                <View style={{ paddingTop: 10 }}>
                                    <TouchableOpacity
                                        style={styles.ButtonStyle}
                                        activeOpacity={0.5}
                                        onPress={() => this.postfollow(item)}
                                    >
                                        <Text style={styles.ButtonText}>
                                        {item.user_followed ? 'Following' : 'Follow'}
                              </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.title}>
                                    {item.name}
                                </Text>
                            </View>
                        </Card>
                    }
                />

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
    TextBold: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 20
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
    ButtonStyle1: {
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 0,
        alignSelf: 'flex-end',
        marginHorizontal: 10
    },
    ButtonText1: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        color: 'blue',
        textDecorationLine: 'underline'
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
  )(FollowAuthors);
