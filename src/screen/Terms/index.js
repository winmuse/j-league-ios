/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,

    StatusBar,
    Text
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Dimensions } from 'react-native';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const App = (props) => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView}>
                <View style={styles.body} >
                    <View style={{ alignItems: "center", paddingTop: 10 * global.c, paddingBottom: 0 }}>
                        <Text style={{ color: '#000', fontSize: 21 * global.c, fontWeight: "bold", }}>利用規約</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１条 （総則）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>本規約は、株式会社Jリーグ（以下「甲」といいます。）が提供するソーシャルメディア投稿ツール「FUROSHIKI for Athlete」（以下「本サービス」といいます。）の利用に関し、甲と本サービス利用者（以下「乙」といいます。）との間で成立する契約関係に適用される規約を定めるものです（以下「本規約」といいます。）。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は本規約に基づき、乙に本サービスを提供します。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第 2 条 （用語の定義）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}> 本規約で使用する用語の定義は、本規約の各規定で定めるほか、次のとおりとします。 </Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}> (1) </Text>
                        <Text style={{ fontSize: 14 * global.c, }}>ID</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}> パスワードと組み合わせることで、乙とその他の者を識別するために用いられる一意の符号をいいます。 </Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}> (2) </Text>
                        <Text style={{ fontSize: 14 * global.c, }}>パスワード</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}> IDと組み合わせて乙とその他の者を識別する為に用いられる一意の符号をいいます。 </Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}> (3) </Text>
                        <Text style={{ fontSize: 14 * global.c, }}>ソーシャルメディア</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}> Instagram、Facebook、LINE及びTwitterを個別に又は総称していいます。 </Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第 3 条 （本規約の運用）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>本規約は、本サービスに関する甲と乙との間の一切の関係に適用されるものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は､本規約の変更を行う場合、３０日の予告期間をおいて変更後の新利用規約の内容を乙に通知するものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>3.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>別段の定めがある場合を除き、乙は変更後の規約に従うものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第４条（権利義務譲渡の禁止）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>本サービスは、乙が所属するクラブ（以下「所属クラブ」といいます。）による正規の手続きを経て、ID及びパスワードを取得した乙に対してのみ提供するものであり、乙は、利用規約上の地位、利用規約に基づく権利または義務の全部または一部を、甲の事前の書面による承諾なしに第三者に譲渡してはならないものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第５条（利用契約の締結等）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は、本規約の内容を理解し、同意することを前提として、所属クラブの承認を得た上で本サービスの利用を申し込むことができます。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>本サービスの利用規約は、所属クラブから乙に対して、本サービスを利用するためのIDとパスワードが発行された後、乙が本サービスに初回のログインを行った時点で成立するものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第６条（利用期間）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>本サービスの利用期間は、特別の定めがないときは、甲と所属クラブとの本サービスに係る利用許諾契約の期間とします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は、自身の判断により利用を終了する場合には、所属クラブへの申し出により、相互の了解のもとで終了することとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>3.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙が移籍（期限付き移籍を含む）等によって、所属クラブから離れる際は、本サービスの利用を終了することとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>4.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙の移籍先クラブが、本サービスに係る利用許諾契約を甲と締結している場合は、乙は、新たに当該移籍先クラブの承認を得たうえで、本サービスの利用申し込みをすることができるものとします。この場合、乙は、本サービス上で投稿済の甲及び所属クラブが認めた公式画像および動画（以下「静止画等」といいます。）について、原則として、引続き利用できるものとします。もっとも、所属クラブが認めない場合は、この限りではありません。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第７条（本サービスの利用）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>所属クラブは、乙に対し、本サービスの機能へのアクセス権限としてIDとパスワードを付与するものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>前項に定めるアクセス権限は、甲が管理するサーバ上において、静止画等を利用したソーシャルメディアへの投稿（以下「本目的」といいます。）とします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>3.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は、本サービスに関して甲が有する知的財産権やノウハウ等（本サービスのプログラムソースコード及び本サービスの表示ノウハウを含みますがこれらに限られません。以下「ノウハウ等」といいます。）を利用して、第三者に対して、本サービスと同種のサービスを提供してはならないものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>4.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は、ID、パスワード及びノウハウ等を本目的以外に使用しないことに同意するものとします。また、乙がID、パスワード及びノウハウ等を、甲および所属クラブの承諾なく、第三者に開示してはならないものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>5.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲が必要と判断した場合には、甲は乙に通知することなく、本サービスの仕様・機能等を変更することができます。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>6.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は、本サービスを最大限の注意をもって利用するものとし、乙による本サービスの利用に起因して発生した損害については、すべて乙が責任を負うものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>7.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は、本サービスの仕様、機能について、甲の事前の承諾なく、何等の変更、改定等を加えてはならず、またその他、本サービス提供のために甲が利用しているサーバに不合理な負荷をかけると甲が認める行為をしてはなりません。乙は、このような行為により甲に生じた損害を賠償せねばならず、また、甲は、乙のこのような行為に起因して乙に生じた損害については何等の責任も負いません。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第８条（クッキーの利用）</Text>
                    </View>
                    <View style={styles.decimalList}>

                        <Text style={{ fontSize: 14 * global.c, }}>本サービスは、本サービスへのログイン認証の目的でクッキーを設定します。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第９条（収集データの保持期間）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は、ソーシャルメディアから収集した投稿に関連するデータ（静止画等そのものの情報を除く。）を、最終ログインより起算して6ヶ月間保持するよう努めるものとします。ただし、甲は収集データの保存を保証するものではありません。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>利用契約終了後は、乙は本サービスのデータにアクセスできなくなるものとします。ただし、第6条第4項の場合には、この限りではありません。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8* global.c, }}>第１０条（ID及びパスワードの管理）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14* global.c, }}>1.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は、甲から取得したID 及びパスワードの管理責任を負うものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は、ID及びパスワードにつき、第三者への利用、開示、貸与、譲渡、名義変更、売買及び質入等をしてはならないものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>3.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙によるID及びパスワードの管理不十分、使用上の過誤、第三者の使用等による損害の責任は乙又は所属クラブが負うものとし、甲は一切責任を負わないものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>4.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>第三者が乙のID 及びパスワードを用いて、本サービスを利用した場合、甲の責めに帰すべき事由によらない当該行為は乙の行為とみなされます。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>5.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>ID 及びパスワードが盗用され、第三者の使用等により、本サービスが停止又は本サービスで提供するシステムが毀損した場合には、当該ID 及びパスワードの管理責任を負う乙及び所属クラブが、甲に対し賠償責任を負うものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>6.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は、ID 及びパスワードの盗難があった場合、ID 及びパスワードの失念があった場合、又はID 及びパスワードが第三者に使用されていることが判明した場合には、直ちに所属クラブを通じて甲にその旨を連絡するとともに、甲からの指示がある場合にはこれに従うものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１１条（本サービスの一時的な中断）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <View>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                本サービスは、以下のいずれかの事由が生じた場合には、乙に事前に通知することなく、一時的に本サービスを中断することがあります。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （１）本サービス用設備等の保守を定期的にまたは緊急に行う場合。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （２）本サービスに著しい負荷や障害が与えられることによって正常なサービスを提供することが困難であると判断した場合。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （３）本サービスを提供することにより、乙あるいは第三者が著しい損害を受ける可能性を認知した場合。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （４）火災、停電等により本サービスの提供ができなくなった場合。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （５）電気通信事業者、または国外の電気通信事業体が電気通信ソフトウェアおよびサービスの提供を中止および停止することにより本サービスの提供を行うことが困難になった場合。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （６）地震、噴火、洪水、津波、疫病等の天災により本サービスの提供ができなくなった場合。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （７）戦争、動乱、暴動、騒乱、労働争議等により本サービスの提供ができなくなった場合。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （８）その他、運用上または技術上本サービスがサービスの一時的な中断が必要と判断した場合。
                            </Text>
                        </View>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は前項各号の規定により本サービスの提供を停止する場合は、事前にその旨を乙に通知します。ただし、緊急を要する場合、やむを得ない場合は、この限りではありません。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>3.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は、乙および第三者からの緊急停止要請に関しては原則としてこれを受け付けません。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>4.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>本サービスは、本条第1項各号のいずれか、またはその他の事由により本サービスの提供の遅延または中断等が発生したとしても、これに起因する乙または第三者が被った損害について、この本規約で特に定める場合を除き、一切責任を負わないものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１２条（損害賠償）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲の責に帰すべき事由により、乙が本サービスを一切利用できない状態に陥ったとしても、甲は賠償責任を負わないものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲の責めに帰すべき事由により、乙の個人情報が漏洩等し、第三者が当該個人情報を取得し、乙に損害が発生した場合には、甲は1万円を上限として、その賠償請求を負うものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>3.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>天災地変等本サービスの責に帰さない事由により生じた損害、本サービスの予見の有無を問わず特別の事情から生じた損害、逸失利益を含む間接損害については、甲は賠償責任を負わないものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１３条（紛争解決）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>乙が第三者から何らかの請求がなされるかもしくは訴えが起訴される等の紛争が生じた場合、それが甲の責に帰すべき事由によるときを除き、乙は、自己の責任と費用負担で当該紛争を処理解決するものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１４条（秘密保持）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>甲及び乙は、相手方の書面による事前の承諾なくして、利用に関連して知り得た相手方に関する技術、営業、業務、財務又は組織に関する全ての情報（以下「秘密情報」といいます。）を第三者（乙においては所属クラブを除き、甲においては公益社団法人日本プロサッカーリーグ及び甲の子会社を除く。）に開示、 漏洩せず、本サービス提供・利用目的以外の目的に利用しないものとします。但し、次の各号に該当する情報については、秘密情報から除くものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>（1）</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>開示の時点ですでに公知のもの、または開示後秘密情報を受領した当事者（以下「受領者」といいます）の責によらずして公知となったもの。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>（2）</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>受領者が第三者から秘密保持責務を負うことなく正当に入手したもの。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>（3）</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>開示の時点で受領者がすでに保有しているもの。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>（4）</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>開示された秘密情報によらずして、独自に受領者が開発したもの。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１５条（反社会的勢力の排除）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <View>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                乙は、現在、暴力団、暴力団員、暴力団員で無くなった時から５年を経過しない者、暴力団準構成員、暴力団関係企業、準暴力団、準暴力団に属する者、総会屋等、社会運動等標ぼうゴロ又は特殊知能暴力集団等その他これらに準ずる者（以下、これらを「暴力団員等」といいます。）に該当しないこと、及び暴力団員等の共生者、密接関係者又は密接交際者を表す次の各号のいずれか一にも該当しないことを表明し、かつ将来にわたっても該当しないことを表明し、保証します。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （１）暴力団員等が経営を支配していると認められる関係を有すること
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （２）暴力団員等が経営に実質的に関与していると認められる関係を有すること
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （３）自己、自社若しくは第三者の不正の利益を図る目的又は第三者に損害を加える目的をもってするなど、不当に暴力団員等を利用していると認められる関係を有すること
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （４）暴力団員等に対して資金等を提供し、又は便宜を供与するなどの関与をしていると認められる関係を有すること
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （５）役員又は経営に実質的に関与している者が暴力団員等と社会的に非難されるべき関係を有すること
                            </Text>
                        </View>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <View>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                乙は、自ら又は第三者を利用して次の各号のいずれか一にでも該当する行為を過去に行ったことはなく、また将来にわたっても行いません。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （１）暴力的な要求行為
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （２）法的な責任を超えた不当な要求行為
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （３）取引に関して、脅迫的な言動をし、又は暴力を用いる行為
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （４）風説を流布し、偽計を用い又は威力を用いて相手方の信用を毀損し、又は相手方の業務を妨害する行為
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （５）自己、自社若しくは第三者の不正の利益を図る目的又は第三者に損害を加える目的をもってするなど、不当に暴力団員等を利用する行為
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （ 6 ）暴力団員等に対して資金等を提供し、又は便宜を供与する行為
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （ 7 ）その他前各号に準ずる行為
                            </Text>
                        </View>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>3.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は、乙が第1項又は前項各号のいずれかに違反すると疑われる合理的な事情がある場合には、当該違反の有無につき、乙についての調査を行うことができ、乙はこれに協力するものとします。また、乙は、自らが、第1項または前項各号のいずれかに違反し、又はそのおそれがあることが判明した場合には、甲に対し、直ちにその旨を通知しなければなりません。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>4.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は、乙が前三項のいずれか一にでも違反した場合は、乙の有する期限の利益を喪失させ、また、通知又は催告等何らの手続を要しないで直ちに利用契約を解除し、本サービスの提供を停止することができるものとします。なお、前三項のいずれかの違反に起因して甲が損害を被った場合、乙は甲に対してかかる損害を賠償するものとし、本項に基づく解除権の行使によってもこれは妨げられません。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>5.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は、前項に基づく解除により乙が被った損害につき、一切の義務又は責任を負いません。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１６条（甲による解約）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <View>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                甲は、乙が次の各号のいずれかひとつにでも該当した場合は、甲の判断する方法で乙に対し、通知・催告をすることにより本サービスの提供を一時中断し、もしくは利用を解約できることとします。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （１）本規約の各条項に違反したとき。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （２）本規約以外の甲および所属クラブとの契約につき、乙の責に帰すべき事由により甲から解約されたとき。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （３）申込書等の記載その他甲に対する申告事項に虚偽の事実があることが判明したとき。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （４）支払停止若しくは支払不能となり、又は破産、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあったとき。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （５）自ら振出し、若しくは引受けた手形又は小切手につき、不渡りの処分を受けたとき。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （ 6 ）差押、仮差押、仮処分、強制執行又は競売の申立てがあったとき。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （ 7 ）租税公課の滞納処分を受けたとき。
                            </Text>
                            <Text style={{ fontSize: 14 * global.c, }}>
                                （ 8 ）租税公課の滞納処分を受けたとき。
                            </Text>
                        </View>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は、前項各号にかかわらず、利用契約の継続が困難と認めたときは、乙に対し、利用契約を解約することができるものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１７条（終了の効果）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>甲と乙との利用契約が終了した場合であっても、本規約第４条、第７条第３項、同条第４項、第９条、第１１条第４項、第１２条、第１４条、第１５条第４項、同条第5項、第１７条乃至第２１条の規定は、その効力が存続することとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１８条（免責）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>1.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>本サービスは、甲がその時点で保有している状態（現状有姿）で提供しており、乙が予定している利用目的への適合性を保証するものではないものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>2.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>甲は乙に対して本サービスについてプログラムのバグ等を原則補修するものとします。但し、全てのプログラムのバク補修、改良等の実施を行う保証、責任を負うものではなく、対応の決定、対応時期等については甲の判断にて行われるものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>3.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>乙は本サービスを利用するための設定をした後に、乙のソーシャルメディアが本来の機能を有しているか否かを、乙自身で確認をするものとし、甲はその義務を負わないものとします。</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>4.</Text>
                        <Text style={{ fontSize: 14 * global.c, }}>本サービスにおいて乙がダウンロードその他の方法で甲のサーバから取得したすべてのデータは、乙自身のリスクにおいて利用するものとし、当該データをダウンロードしたことに起因して発生したコンピュータシステムの損害及びその他のいかなる損害についても、甲は損害賠償責任を負わないものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第１９条（準拠法）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>本規約の成立、効力、履行及び解釈に関しては、日本法が適用されるものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第２０条（協議）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>本規約に定めのない事項については、甲と乙がお互いに誠意をもって協議し解決を図るものとします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>第２１条（合意管轄）</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>本規約に関する訴訟については、東京地方裁判所をもって第一審の専属的合意管轄裁判所とします。</Text>
                    </View>

                    <View style={styles.titleTxt}>
                        <Text style={{ fontSize: 16.8 * global.c, }}>付則</Text>
                    </View>
                    <View style={styles.decimalList}>
                        <Text style={{ fontSize: 14 * global.c, }}>この規約は令和２年8月29日から実施します。</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const logWidth = 270;
const loghight = 220;
const styles = StyleSheet.create({
    decimalList: {
        justifyContent: "flex-start",
        flexDirection: 'row',
        marginBottom: 5
    },
    titleTxt: {
        paddingLeft: 10,
        paddingTop: 3,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: "#FFE4C4",
        height: 29,

        borderStyle: 'dashed',
        borderLeftWidth: 3,
        borderColor: '#4682b4',

    },

    scrollView: {
        backgroundColor: Colors.lighter,
    },

    body: {
        backgroundColor: "#eee",
        //paddingTop: 75,
        paddingLeft: 25,
        paddingRight: 30,
        paddingBottom: 100,
    },

});

export default App;
