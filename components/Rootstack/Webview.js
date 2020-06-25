import React from 'react';
import { StyleSheet, Text, View, Button, Picker, ScrollView, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';
import ReadabilityWebView from "react-native-webview-readability";
import HTMLView from 'react-native-htmlview';
import SwipeablePanel from "rn-swipeable-panel";
import { Dropdown } from "react-native-material-dropdown";
import { block } from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const htmlContent = `<div><p><span>Whshshs</span></p><p><span>Ahshshsh</span></p><p><span>Syshshs</span></p><img src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdC
IFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAA
AADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlk
ZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAA
AChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAA
AAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAA
AAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3Bh
cmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADT
LW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAw
ADEANv/bAEMAUDc8RjwyUEZBRlpVUF94yIJ4bm549a+5kcj/////////////////////////////
///////////////////////bAEMBVVpaeGl464KC6///////////////////////////////////
///////////////////////////////////////AABEIA2ADYAMBIgACEQEDEQH/xAAYAAEBAQEB
AAAAAAAAAAAAAAAAAQIDBP/EACsQAQEAAgICAgIBAwUBAQEAAAABAhEDMSFBElEycRMiM2EjQ1KB
kUIEsf/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAJBEBAQEBAAICAgIDAQEAAAAAAAERAiEx
EhMDQVFhMkJxIpH/2gAMAwEAAhEDEQA/AOgDk6AAAAAAAAAAAACwgBQAWRNAIAgqhsoKJIoiKAAi
gLtm02o0b8srEFEX0ogQQQU0CdLBAUIoGj2i72C+APYhCgAEAUBRdgCB2a8roE0poXABWoAAgAoA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA84g5OigAAACKAIoAAAALBIoAJsGkqbXsEUA
RRAVWVBTaf8AYIHoAAIKKlIIoe1ADXk0odppvX+U1oRmLoUVE8qRBmyrF9gEAA2qKILA/SgC6EAA
FQAAA87WCtSAA0gAAAAAAAAAAAAABPAAAAAAAAAAAAAAAAAAAAAAAAB7AAAAAHmAcnQAAAAAAVFB
KoaA2VFAVIoJRUoB6AFnQmwFQ0oIqKB5FP0IlAFABFIdLoE0uvAe1BUoI0lCgAAilANIq6MGehV0
YENEVcQk8GhVEAZAFBBQABQVFaiACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADzB
6HJ0AAAAAAFRQF2gBo0oAXpaz6BZCxItoJpSAIKAAUAUENBOgBNKASEGoCC+DSolIHpAOjpQPSd1
TSgAAEAN+VT2AtpsQDaodA0IogAAAAoAAKCoLKKG0XUUBQAAAAAAAAAAAAAAAAAAAAAAAABQAAAA
QVAAAAAAACgAADzAOToAAACgAgCgAAoaAVKAIKARU9rRBF2AIoCL6QBT0GgWRNL0nYLtYysAAAXe
wED/AAiwAUBPQoCAugT9imgT9Gl0KGjQAKiiAAAAKAAAoCi4IKGIAKACgAAAAAAAAAAAAAAAAAAA
AAAqKAAAAAAAigIAAAAAAADzAOTqKi7EQAAABUUAAF2hFA9gAaFqURezaEAXQewPAukBF0KCGhQT
oWmvAG4IoAH7BdoAiwU0CKlUDoNEUFAQAARdAIKAAoCKAigAAooDSAgmgogqiKuoAKAAAAAAAewA
AAAAAAAAAAAAAFAAAAAAAAABAAAUEFQFQUHlAcnUAEFRQXSEARrSKCQNACxABYhoFpoAWKn6PQin
gh6A9h0AAAqCiIbCioKART0CJVD2ApsAAgKAqAKCCgAAJpQAAAAAAAUG/SCAzqgKSAijViIoEgAK
AAAAAAAAAAAAAAAAAAAAAAKIoAAAAAAAAAICgAIoACA8wqOToAoEO09rrQEi/wDSbXoA/wAFNgU7
XQIytVNiixARSxFgCkQFBAUIQQX2AAAAQBJF8igVD2oIKAigAAooAiiKAAAAAAAAAAoEAgAAAAoi
tRABQAAAAAAAAAAAAAAAAAAAAAAAAABRFAEUARQAAEUBBQAEBQAAQHnAcnQJ2EBdNa2kVUZsRvs0
YawpZ5EUX9J0bEXaBoD2L6ARQAn0AClSLQAUQVAAUARQAAANCgCglFQRQAUBQAQAAAAAAAAAFAAA
AAAAAFAaQAUA97AAAAAAAAAAAAAAAAAAAAAAAAAAAVAAUAAAQAAAAFBBUB5wHJ0CCyA0qQVlYukF
CwsOwGbGbNN3pGVZm1UA0IAvYAAaAUJVBFPYIAAoF2oAAAAKiiAABoUE0RQABQAAAAAQAAAAAFAA
AAAAAAFAbQAqAIoAAACgAAAAAAAAAAAAAAAAAAAAAAAAACggAAAAKAAADzAOToKQAlajII2mwVA2
iiiLAE9miqgIVAXqqnZrQLpFAIoCBABRF0oCgiCgIoARUUABQAAAAAAAAAAAAAQAAAAAAAAAFABR
QGkAABBkUQBRAFAUAAAFAAAAAAAAAAAAAFBFAAEAVFBBQEFAQgAoAAAPMA5OgKegBUEWVagoKhpB
YUgoGgQSrrwKqACho0TtUwQrSAIoBFIKglUAAAAAUABKoAAAAAAAAHsAABAAAAAAAAAAAAUAAWAN
RABQRRkQVAFAABQAUAAAAAAAAAAAAAAUAEFQAAFAAAAAAAAAAAB5lBydAADYACokEVYigLEX2AL6
QQirJ4FAAAAFAVAADQAAAAAAAKAAAAAAAAAgAAAAAAAAAAAAAKAAAAAACorUQAUAEBCVUABoAAAA
AAAAAAAAAAAAAAURQAAAAAABFAAAAAAAAB5xqGnPG2RdJYigAAALoAQUAIqKIdKaavTWIyKGCKBg
AAAKACAAgAAAAAAoigAKACAAAAAAoAAAABQAAABQAALNimCKC4gAoAAAAAAAAAAAAAAAAAAAAAAA
ACgAAAAAAAAAAAAJpQAAAAByCeRhoTSgMWDaaTF1lSxEFO4jWgBdAgKmgagitoEABUAVFRKAAGwA
AAAABQEFARQAAAAAAAAAAv8AgAAAAAFUQUXEQUTBFBQAUAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAA
AAAAAAAAAAAAAAAAAHEUc2kUAQUASxQGdeWl0aME0qKCmkAURVQVAAAAItAAUQBAAAVBRQAAAAAA
AAAAAAEAAABQBSIANAAAAAAAAAAAAAAAAAKAgoCCgIKAgoCCgIKgAAAoAACKAAAAAAAAAAAAAAAC
KgKioDmCsNIKAigAIAoKqIaBFRQ0mCwSKsQUFEXQGAAoAIABgAaMABAAawBUTAAAABQRUAEUAAAQ
FRViADQAAAAAaAAAAAAAAAAAVAFEAUAAQBUFAAAAAAAAAAAAARQAAAAAAAAAAAAAAEFAQAGAGWgA
BFEAAABQUBAAAF0AAoAAAAAIACAbA0AAFRWkAFAAABMAAwRQMBFAQBFUBUAFAAAAAAAAAAAAAAAA
AAAAAAAUAAARQAAAAEUQFEAUQBUFAAAAAAAAAAAEUEUAAQAAHMBhpQgoAQAVBBQAVFUQUAAACQEA
EUAAABAVBFAwNKDUiACgAAAACe+wUAAAABAAAAUAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAQAAAAA
AAAAABRFAAARQAAAEBRAAAAAAAHJUVhoUAANKEU0CAooigAAAqAAAIqKgAKAAgCmCKAACgAAAAAA
AAAAAAACWyTdT54/bPNfEjkxesrc52PRMpequ3mamdn+SdF4dxjHOVqVthQABLZJuuWXLb14S3Fk
tdrdM/PH7jh5oz8mvg9G9q445+NOmN20xWgFAAAAFEAVJNKAgKAAACAogAAAAAAAAAAAAAAAACgg
KAACAAAAAAAAAAgMAObSiKooiqgAoKgCiAKIICoAoCgAAKCAAAAACiXfpQAAAAAAAAAAAAAABx5r
/VI55eI3yfnXPJz/ANnT/VmWtS/a4Y7dPg3ZKxLYxK3jmzcdIz/i146eiUyymM3XLHI/O7vTVv8A
DMn8pflnd01I1azraTlb0zajrMGc5qnXo59uduq7cdccnTjpz6OvbvBIrTIAAAAAAqAKIoCAAAAA
AAAAAAAAAAAAAAAACgAIAAAAAAAAJaCggKiogwAw0KiqAAgoKAAAAAAAAKAAAoogIohbqWgo43mv
qM3kyvtcYvcehn5Sd2PPbb3ahifY9P8AJj9xP5cft5xcZ+yu/wDLj/k/lx+3AMPsr0zPG9VdvK3j
nZ4qNc977egYmW2x0AAAAAAAAefK7yrGXbVZv5OfPt069OnHHaRy43aOjmzcXPLF2ZynhCODUrOv
DWMTn0117ak21MVxjTTKac+adOrHLP6UvpefbhemuNm9GHac+mu/b04qzi00wAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAqAAAAAAAAAAgIAAiiArADDQpBYCoKgqKAAAAAukAXQCgAASgAAIM5/hf00z
n+F/QX084DTzAJllMewk1Rj+T6h8shr4VsY3l9n9X2L9dbGd5LMvsS8WN45adcct+3BrHLQ1x3+q
9EVzxy23tHVQAAAEy8Y1WeT8KlWODPtpNMc3HTqa68bq4Y5a7dZk3LrnZjRTYqOEni/trGLrW/2s
iRb7aikS2SeVRWeT8axly/UYuVvdZvUanNRnDtpnH8k4Xt6MOm2MOm22AAAAAAAAAAAAAAAAAAAv
iCZfjQc5zT3K1OTG+3nFcZ3Xq3F28ktnTtjn48o3z1rrbJN1wz5bfx8RM8/ldemFZ67/AFGvnl91
qct9+XMGJ1Y748krcrytY52Jjc/J/L0jljySuko6S6oAoAAAAAAAgIoCAAACMgMtggCgKKlUEAAA
FFRRAAUAAAAAAGc/wv6aZ5Pwv6Evp5wGnmGOT02zn6GuPaYY7dZxnHHeRHdy/jX+N10ugcf42bxv
RpNA81x0jtyY/wBNcVce5laxy0645bcGsctC8dfqvTBjHLbaOoAAUAcc45XcemzbllhpK1HOZfbW
OWuksNfTHj/jXn/rtjntuV5pfLrjk1KzY6WEhKznl8Z/lpmeTPP4+Pblbcrtde8v/EuX/Uc759uk
8ek8RLfHg2drn9Jv9s+a1jj5XHF1xxbYXCNpIoAewAAAAAAA7AAAAAAAAABMuqqZdUHlAV5hJb5U
FlwC2Tti5/UCc2+mxiZX6amU/Qt5sUC3UGS3Trhlt5t3LLbtxo7885HolXbOPS1K0uxFlNABQRRB
FRQAT2AKgACIx3AipG0FARRVQAAAACzaqIoAJpaIAFAAA3DbzZflf2jWOX2PVuM53+i/p525l/Ro
Wd6wAriM5+mmc/Q1x7dOJ6I8/E9ER3UAAAHPmusdfbg3y5fLL/EYVw6u0AGWsMvLvjdvJjf6q9PH
UeienQGc85hPP/gtuNW681zy5sZ15cssrlfLKuV/J/Drea/UT+TfccwZ+db3KaYamX2mN8/k/lNL
PDU1T4pjr8mscvCXdu/f/wDCRq9FmkuOV8M9t5eGdrIz13P2TFrWu2d37Qxj7HWZYz2v8snUriLj
Pzrrea+pEnNfcjmCfKvRjnL01t5pddNbmU89o6TvXo2beQMT7P6evZt5AxPs/p69m3kDD7P6evZt
5Aw+z+nrNvIGH2f09ezbyBh9n9PXs28gYfZ/T17NvIGH2f09e2cr/TXmbwy1jYLO98MAK5Bbqbo5
53d16gvM2pu5VvHDZhi9GOCPQ5zjLxu8i6QeW42M57vh6ri53A1PjN1xwxejDHSY4OkmhVAQC+Ao
htWVNFEVVAAEVAABAAGPGlibhGG1FGkRYG9AodigAAAAAAAAAAADzZflf2jrnhHHLc6XXD66rO/6
tJvJZLvdGpzZ/wDGgFchnP00zn6GufbpxPRHn4noiO6gAOfLn8Zqd0z5Jj4nmuNtt3Rz66zxEAVy
EyuptXPO7uvoXmbVwnl6uOeHDjxejGeEehcspjjuvPlbld1rky+WX+Iwrj31tABgGMs/pPN90bnF
roMSX7rW77C8VqXTeOW3MEnV5eiLpxxz12645bR2llTPDccHqrhyY6uxjvn9sBbpm5z15VzktaHP
5ZXrwat7o1Px103J7T5T7ZmCzjTWvrjQkwsVWOufiWgz5gv+X/WhndTeRp9dbGN5G8jT662MbyN5
Gn11sY3kbyNPrrYzLlvy0M2YAxnlZrQSbcbHOZZLvI1r662luqzvJdW3yjXPNl1oBXIc9f1V0Yn5
Urp+P278eLtI58fS5csx8d1HS2T26Dj/ADX6anLjf8JiTqVs0m9r7Ro0AAolUEpsZRFRRBUVYoqC
qCCaiibTZo0JtQYX0mlZbWCRWogAooAAICggKAAQAAAABEsYuDoA5fxpcNSu2mc5/Rf0F9POA08w
zn6aBZcutcTvMpJ5seYMb+x3vLjOvLnly5Zf4jAM3u0AGQGMs/UFktM8teJ2mGJjjt3wwR3kxrjx
bzvxwq4zTHPeoJ1cjiArgMZ31G74jlPNG+Jt1ccdu2PGvHi7TUm6jsxMGM5J49rny78Y+J9uY59d
/wAAFuu1cvY1hk43K3xOmsIjrxznmvVjdmU3EwbHR588GP43quLN+M7sBynG1ONq8mM68s3lvqDN
7jUwa+LjeTK+0tt7tMZ+yO1k+44ArHXXyABkxjpMHKXWT0YI9Euxn+MuEk3XVw5M/lf8CddZEtxT
c+kFcvnV3/g/6QD50AGbbRjPuNsZ9wa49tYY7dZxs8b0SI7uX8ZcNR10mXVB5gFeYYn5VrK6m2cP
N2OnHjy6/LU1GQGLdoAIstnVbx5PtzBZ1Y9Ey21Hmlsdcc2cx25610Sm9iVQ0HpACACoqgAKgIiF
RURBdoA0bQVtK0ysIqqhtpAFAAAAAAABREFAAAAAGeT8L+mmeT8L+lL6eYBXmC2TsY5OoLJtxsc8
cWvjfumt/W0M6y+6nxpp9datk7pMpbpn4NTjTV+uKlxl7XVnYrndlMZJXfDTgstnQ3O/5emOPN+U
/TWOe2eXzZUa7/xcwFcWc/xOOGfU/a4+IOvNkjtMphP8sZZXLtkGOurQGMs/UEkt9NZZSOd3lfKy
W10wwR255kZxwd8MFxwdJBok0znyTHx3WeXPX9M7cRz67zxG8uTK+9MArlbaAACXORm529TQ1ObW
xz1b26B1zgAMs383fjcL+bvxo9HPprly1h+3B15v/lyVy7vkTK/GK55+ctfQnM2r879L8r9GGG3W
caOvwjl8r9Hyv07fxn8YfGOPyv0nnKu/8ZMBZzInHHeMY46dIKJl1VZy6qDzAxnfTTzybUt+WTcm
ppMMdTbQ11f1BLlJ7Zyy34iTHaas4/lr5z7a7ZmC/Cw1b+OfpRN2dpnfGousfG7iXLd8dOmDlji9
GGLNdpM8Ok6D0M0FlQRFQAUiCq1tBAVFQEFREAAaAabNIoYECKCCigAAqKIkUAAFAAAAAABnk/C/
ppnk/C/oS+nmAV5xnP00zn6GufbfHHWYOfE9ER3Y+CfB1Ac/gvwbAcs8PDi9Vea+LVjl+RABzN6r
WV3jHPL03j5iO0884gCuIAAWyTyzllJ+2POV8jfPGrcrl10uOG2scHbHBHWTGcMHXHHSyaMs5hPP
f0L6akHPDk+Xi+K3sSXXDl/uVh15p7clceplAc88t3UEk1rLOTryxbcu1xx2648aO05kc5g3jxu2
ODcx0NOM42HXPknWPlyVx7soAMM383fjee/m9HGj0c+muXHePjuOD1Xpwzx87GO+d8xhz1/XXQ0r
HNyunHHXxJ5eeZWdVLdpjd/JP073lxnXli8tvUkcxWL3atyt7pLZdxAZ2u2OcrpK8s8OmGaO3PWu
7OXVJdmX41G3mZ1utDThOsmDOV9NOd/KlXibVxm3bDBnDF3xjLskxPi2jKOVwYuDvpNA544adZCR
VCoDKAAAAAAAAAACAAADQK02AAigoCoICgIKAAKAAAAAAAADPJ+F/TTPJ+F/Ql9PMArzjOfppnPq
DXPt04nonTzcT04o7qAAABXlz/O/t6nm5PzpHP8AJ6ZAVyZz9N8bGfcdONHbj0uePuMPRrw5Z46o
nfP7jDGeVl1G0sl7Vzlkvlzxm3bDBnGadsbjPcR3ljWOGm5NOd5cZ15c8s7l+hm9yOufLJ4x81xt
tu6grlerR0xzczoXnrK727jjlNVrDLw1lPlEdeudjk5zHVdBXLnr4t8eLrJJHCZWdUtt7u0xv7I7
ZcuM68uWWdy/X0yKxerQAZAAYv5usyuOnL/7rrrcR28/Hw7TKWbhZtwxyuNdccti89axljph6LNu
eWAnXG+nMOkuUiuWVS2Tti531E1bfI1OL+1uf1E+WTeODc40dJzIxjdzyvTWWPxZVy68Xw64ZN2+
HCXVdZdxl1l2a4gNOAxPyrbE/OpW/wAft343Vzw6dIy6gCAAAgIgC6BAAAAAAAAAQAAAAGxBptQF
AAFAVAAAAAAA9gAAAAAAAzyfhf00mU3jYFeUayw+P+WdxXnvNgzn1Gmc+oLz7b4npxebienFHdQA
AAHn5fzr0OPNOqMdzw5AK4s59x14nHL8o7cSO/Hp3nTOWO2oo082WOmXpyx245YDHXGsBfHYrlZZ
7ABAS5SMXK3rwNTm1rLKT9s7uV8kxdccEdZzIYR3k8M44adJBpxzxc3pscs8BjrnfMcwFcQS2Ttj
LK5eJ0LObVufnUbc8cXQb64/gDcBzxj/AO674Tw4f/dejj6R6J6Zzx9sy6d7NuOWOhjrn9xvHPbf
bztY52GE7/lvLDbleN2mcq+KN7K4TjdMeN01IXPGexdSYLlZhPLGXLf/AJmnK227pjne/wCFtuV3
UBXJnK606YXw42/LJ1wnhK78zIgCuAxPyrbE/KpW/wAft6MOnRzw6dGHUAAF0q4M6XShgipbpNmi
ewGUAAAAEVEAAAAABRpQl202AKAACoogAoAAAAAAAAAAAAAAxljtxy43p0mgeW8afGvV8U+AOWGO
neJMdNQAAAABnObmmig8tmrpHbPHbjfCuPXFjOU6rrxMLjdVF46/VemKxjluNjqJYoDllg55cb06
ZuIPLcb91m4167gnwDHmmDWPG7zBqYg544OkxXSgaAAZs20A4Z4OVleuxi4CZHl+FrWODv8ABqYi
ueODVwdJF0DzZcbPwser4s3EHnmN27YRr4NSaA0zli2WA82WOmXoyx25ZYDHXG+mA6Nq5XmwAEA3
J7Zuc9eRZLWnPLLfidFty7axwR054z2mGL0THWKYYOlmsajo84DTzDE/OtsT8qlb/H7ejDp1kcsO
nTbLq0fpnYaNJtENNa2m0E00ARAAAAAABFAQBEABQAGlQbbUQBRAFAVFAUAAAAAAAAAAAAAAAACz
YAAAAAAAAAljnlht1LAeW4Exsei4p8AZxdIkxagAAAAAAAAAAAAAAAAAAAAAAAAAADNxaAcssHPL
jenSXEHkuFT4V6vgnwB5vgs43o+CzEHHHjdMcHSQAk0XpUQcs8Z9ON3PT02MXA1m8xw+X+En5Ot4
yYGk5k9N4OjOM00yoACAvpEQAAAAAAAAAAEAAiAAAADaNJp0bRQANAACgCKIAKAAAAAAAAAAAAAA
HsC/4AAAAAAAAAAAAAAAAAD2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIAgJe1S9oiaNC7AAAvk
AEARAAAABUWKJ7CiAigIAgAAAAKiqNgOjQADGeWvEZ+d+0yu8qluo4Xq2+HSTw6TLwty1NuGOTdu
5HW3IxPNX55LjlfbDNy/q058W2tXMeiVXPC7dI7MAADNy/q01bqbcd+dsddY1Jrtsc5k3K2yvnaZ
XU2rPJ+KX0sY+eX2fPL7ZHD5VvI188vs+eX2yHypka+eX2fPL7ZD5UyOmOW55alcLlrJ1wrtz5jF
9tZXUN7m4xyXpMcteE+X/rFzxrqMytNsgAJndQl8bc87urMvDE6241Z4dBmVptkAABnO6xS3Axy3
a1txl1W5kzxdi2Y2JKraDNy1WmM+0pWtq5bamRLo2EooMfKt1yZ6Sr8qsyZc8stZ6JSPRKmV10zh
drn6W+lT5U+VRMrrG1nWXSZNb8OGGW3X020z8qfKoOe1lflT5VA0amTUrmb01KuuoxjlttpUyuox
8q1n0wxalX5U+VQTai/KrMmRdXXTauO9V0l21qqlvhUvSIz8qbqDKLMoscPl/VZ/l1xqq0m60wiL
up8hyzy1nog7Sq5410igAgW6NpWbdA2MytAAgCbAAAA2ALsY3q6rUqCqQBsJdscl8OluTW42mV1H
HY538jXxGOS6x/bY5y5Vrng6A111qSYW6lrjj5rslk0vHWFmt4dOrlhXV2YAEGOS+NOa5XeSOHV2
uknhMrry3hdsWbmjjrpxfDPUeiFSVXRlyzjl8bLt6bGcsfCUcwHndXDPdzqzGln+pXfDHw9E9Odc
8cXbGaamK60qOef5MrfNR57fOukXC+XWVwvi7dcK7y7NYvhtnO6jTjld1nu5CTUTK60rOf4uXNyt
3064V0cOOu8ehzAAHPku7r6dLdTbg5/kvjGuRN6yVnOeN/THFytWeHbGtuPHXaO7mMZ9tsZ9s30l
ZAZRccm5XNccvVbl1p0vTk6b8OadJRxz/u12cM/7tTn2R34+msvTPH01l6avpayzyfhWmeT8KxGW
ON3nThxu86dGmQHNl5uS28l8tYfKdUs/1L+3XDHw201LuBrQxWWd6ydca48nixvC+G56abz6Yay6
ZZvtKmXjC2fTzTd9vTZuWfbnjxWe4SkXi31XRJNKlRnk8Y7/AMnHltnmupJ9nG1PSu8L0kL0gyAi
PP8A7mX7d8OnD/cy/bvh00rbLTLKDhy/3Hd5+X+6sV143WOPG7QoFEqIjOc3i0A54V1jh+OdjtjV
GgEGaF7Acv8A9Fsxmvtyx36tdf8A9HWP7Zwi/pXTjyuU1e22cZqtIjOfW/oxq5fjf05cdB32JFQd
GM5uNpXSzY243x2LnEceuZG5dGfnj/yic11hr7cscdrzxs1LceiWWbgmE1itupti+2kueMurYzln
jrxXHW7t0xwdZxGPk6cdd45YY6dY6MqzndYtOfJd3X0z1cizzWAJZenB0GL/AE5/ttnOeN/TXFyp
fTthW3DjrtHZzVMuqqZdUo4gPM6uX+5Xo4+nn/3L+3o4+npnpyromV1jVY5L4LcixzAed0LNw476
Evi7b4ueGeo65Zf06+3M7GertWTBLNyxRFZ4q9GLzY+MrHox6elyaABjkvpzXK7u06efq7XSeIBL
vyIrOF1dO+NcMvFldcK9HN2Od8OjGfbbGfZfTNZBMspjN3phFDsAmWvFAW3VHHP+7XZwz/u059kd
+PprL0zx9NZemr6Wss8n4Vpnk/CsRljjd5+LhxO86dGmQHNlwv8Acv7d8OmbhLd+2p4a1dL2CZZT
GbrKOfLf65Pp043DHeWW77ejCeG401l0y1n0yzfaUEyusbfqOH8+X1ExHoHGcuXuR1xymU3DBnPC
Z+faYeLqujOc15WVXSF6ZxrV6BkBEef/AHMv274dMXinyt323JpdVtldoiDz8v8Adeh5+X+6sV14
3WOXG6lBlbURATc3r2oOfLOslwrVm5Y5YXV1Qd4rMrQM3sKA5c/WP7TjdcsZlNVJhICxQBnluuO/
+OXGnLn8stTqNccUdp0qRWUatvxrnu/brl5lcb47O9125AHNos32an0nzx/5RZZers8gCXKS+bAN
T6i4aT54/cZwvl141jp6I1pnFp0ZLdTbhfLpyXxpzce75xvmJldY2ufFf6rPt0ykymqk45LtJZmL
d1oBlWMf6ctPRjXDPxZXTCu/N2Od8OqZdVYmXVWo4gPM6uX+5Xow6ef/AHL+3o4+npnpzro58l8y
Ojlnd5Vnv0vPtlnHPedx/wDGnCb+W3PnndW3HcJ5gy0McuWpJO274jhb8stt8Taz1XeCY/jFYvit
MXxm74Xw4Z+q68dd+b4c77dWc7rH9tRy5LvL9HVyEnlljlusdfbbOWEy7cecl8t1OK7x19NpjjMe
lOst8ETKbmjC7Vj8c/23+O/pOo9M6Zz7ML4M+3Tr051lz5/w/wC3Rz5vw/7YntGOLK4+L079uOE2
6SWNWLjQDKDhn/dru4Z/3avPtY78fTWXpnj6ay9NX0tZZ5PwrTPJ+FYjLHE7zpw4nedOjTIDmyDz
cmWX8l83w78eXyxlva4rTjzb+c+nZjkm8f0T2kZ48Xoxjlxu0aaTPphrPplmpWc/wy/ThhNu+f4Z
fpx4yEdccFmPxrePRVoiZecaqZXWNv8AhlHPjrt6efjd50tUARAefLkz+dkviUmef2uLj0Dh8s/t
3TEHn5f7r0PPy/3ViunG7Ry43T0USgdxEea5/wCr8npc/wCHH/LpJqaKDlyTWe/t1Z5JvH9AY1tx
wrrCgAAOXPbMZq63WeDO71bv6MHdjl3/AB3TYDy4R3wjnJ8crHbHoo0AiOjnnPDoxydOluR0jmxy
3WH7bcuW7yk+nHmbW76Yxx27YTWKYYtt/kv6Z5L4jzfldu/JdY/tjCH45406McHXHDTeOLenRlMY
0M53WKW4OeV3doM8mXxx8d1w9109NDzz5X3f/W5Mvut/WnydRzx+Uvbox1ziy6lm5pOOtMXxn+2/
x39J1Hoxq5dVjC+G8uq6VhxAed1cv9yvRx9PP/uV6OPp6J6c636cXXK/01yc/wAla5TO6wrnhGuW
+JDjjXE8J17bk1BvXhi+GO551ea58uXj4z2mGKWfLLbtx4unMyM26a0N5zww5dzy3PTOf41rjpfM
Z463+O+Geno3qbcWsr4kZZ7vnF5gOfLld6lYnyvuk4thenccvjl91rDc8UvGQnTbOc8b+mhiXLrV
XjrWXblh4unTt3vpyo5834f9ujnzfh/2zPbJxu2vDjxPROnRpzs10OljnZq+GbNTBxz/ALtdnHP+
5Unsjtx9NZemeNrL01fS1lnk/CtM8n4ViMscTvOnn43onTbTIDDLz5T/AFL+3XCac7/cv7dsZ4b/
AE0oDDLGPjLTtK45+LK3hfDStZMtZMs1Eym8bPuOePHlO3UNCeC3YAOXPl4+M9tZ8kxn3XCbyy3V
kVvjjvOmMMXT0UQBEeaz/Uy/ddccXL/cy/b0YdNKnwaa0yzUHn5f7r0PPy/3Vix043WuXG6FATK/
HG15rllb3Uk1HqHmny+7/wCr/VPdXB6BMbuSqg46+OdjrL4Y5Z4mX0uF8KNgIOX/AOjrH9sYTXlv
n6x/aYL+h27ExVBz5JqzJrG+Fym8bHPCg7CRUR0Zzx20V0s1twy8OWrbt6csdszAkk9LqYY+DKad
JCwsl9mvNlvKt8eLfwaxx0SYjUigoM5Y7aEs0ccppxylyr05Y7Z+CTmRdc8MHWYLjjptpHP4M2WO
zNm0sl9rrz3Kz0m7lrw7XBJh5ScyG1cHT0zjjptUccppzudnp6MptzuDPxi7XHGW3dejCeEmGnSR
pEym45ZTTuxljtLzL7XXny3lfLpx4tfBvHHS+kXXhjPF0SwHGYeXTGaXTUUZym45ZbjuxljtLJfa
64fO/S4Ty3/G1MNEkno3T47Yy8OumbjtPjDa8/xtvl0wwbmDcmmkZmBcHQBwy3GLnfp6Ljti4M/G
Ltcpbctus6Jg38VxHLLKz055ZXPxrUd7htn+MwZ447xnHHTelBLFAc8sddOdx3lt3sZ+KCYRrKbh
IoOOWVnpzyzyymtO+WO2fgZBjjjvOmccdNg55eHO8lnqO1m2LgmQccZblu+3fGeCYabkUYy8Od5L
PTvY53BEc7ncprTeB8GpNAt6Yyys9OjNx2g5Xly/4xP5sv8AjG/gfxngY/ly/wCMS5533r9On8Z8
FHGY2uuGDcwakNDGLVEHPK6c7y5T1HbKbYuAOOMtu3owiY4OkmlF9OeV03tmxKOV5LPTnd5Zbrtc
EmAGEat0si2eAcM8rl49M44u1wWY6BnHBr4NyCI5+cembyWeo62MZYqOd5LlNai4L8GpjoF3qMXk
s9Olnhi47Qcssrnrc6bwi/BuYgMZZ2enTTNxBz/ly/4wx83f218FmINzpUioOgDq0GgQAFAAAAAA
A0AAAACBpNKAAAGgA0AAAAAoAAAAAAaAAAQAAAFA0AGgANGgAEVAL4EBQAAAQ0AAAACAAAgIiaUA
EUETRpQVNGlAAAAAE1tQDo2gaACIGgAAAAABQE0oKzoUEQ0qIGgBAADQAAAOgDq2AACgIKAgoCCg
IAAAgAAAAAKAAACAAAAAAAAAAoHsEAAAAAAAAAEBUBEAAAAAAAFAEQUAAQQVAANiAoAgAKAAAAAA
EAFqACCgiKggAAAAAAogAogAAG0BAAEAAAAAAdBR1bSeVAAAAQ2CoAAAAAACAAAAAAAAoAIAAAli
gAAAABs2AAAAAAACAqbBEAQFQE1AAAAAAAAAENFEUUAABERRABUAUQBQBQBQAAAQABABVQVEQAAA
AAAAAAABEAAQAAAAAAAB1BHVtUAABAAAAAAAAUAEAAAAAAABQBEFEEFQNgqbAQAAEEFEVRRFUBNg
GxBAARBAQBFABAUAAAAENFEERQFUAAAAAAEUAAAABUAAAA2AAAAAAAAgKgIAAAAgbAAAUAEAAAAA
EAAHQB2bAAAAAAAAAAAAAAAEAElBQAAAATZQNoM6mnkABUoClqBoAiIoCgbAAAAQQVPYgKgIgqAK
gAAAAIAICgKAAKgAAAAAAAAAAAAAAAAAqAKACKICqgCAAAAAggogCiAKAoAAAAAAAIOgDs2AAAAA
XyAAAAAAgAAAAgCIKgoogKW/SAygAIACgAghsQAAAAFQBQRQAQEVEQAARUQAEFEFFBAAAUQBRAFE
UARQAAAFAAAQQUBQEEFEVQEAUEBRBBUAAAAAAAAAAAFEAUAAAAAAAHToB2bAAAEABQBEFE2oCAIG
wAAAAQAACiFARWUAQFEDRdsgmoAAAAogCiBoogKACAAIqCAAAAiAAAAACqAAAAAAKgCiAKIAAAAA
AAAAAAAAAAAAAAAIgAAAoACgAAAKIAAAogCggOoUdWwAANoCoAgAgdgKAaAKAgAKACAACVDZGdQA
BULUTQARAAAEBUFBFRQAAAFAAABAQ0AAAKgAAiAAACgAAAAAAAAAKAAAAAAACAAAAoAAAAAIICAA
AAAqKAAoACgAAAAAAACoA6b89Kg6tKgAAIAAAbNgAAAAAgKIAogmou2bSolpoAygAAAAIAqAgACA
AoqKoAAAKAAAggAAAIgAAAAAAAoAIAAAAAAACgAAAAAgAAAAAKAAACAioAAAAAAAACiAKIoACqAA
AAAAAA2IraisqAAKACAlpIgpaGlBUVYolVkBTQiIKlQEBmoAAAAIqAAIgAAAAqCqqKgKIAAAAAAC
Am1AAAAQAAAAAAAAAAAABFAAAAAAAAABAAUAAAAAEAAAAAAAAAAAABQAAAAAAAQVAFQBsBtoVNgK
GhQQogKgCiGwVWJdJcrtdGrRmVfloF2bYuXk+Uiaa3tGZdqlqKIIACIAAAAAACVJkDQAACqAAACA
CAAAl6VL0ox8l+cZ1s+FVW5ltpjGaalRFAAAQAAAAAAAAE2W6c8slFuXlqXbisulxXcZxy20iACA
AAACAAAAogCoSgAAAAAAAAAAAAFukmRl05bsVXbY4/Kt4XZg6CKIAIIqAKIAAA1VSr6baFiAKAui
UE2iKbQTQ2CbAQ35TJRd6Zt2lu0TRRAFl03LtzXGoOgCIAAAAAAAUHPOsy+Vz7SdtK6zzFZxaZQA
UEt0rOQErTGNbAAQAAEvSpaok7VmVrsEyqY5M5pO1V22JiqIAIAAAAAADNult1HLK7qxTLLbINKA
AsunTHLbksukR2VjHJtEAEAAEAAAAZyyacs1itY5NuGPbvOigAiAAAAAAAACoAmXTEx3W8ukxVT4
RZJFBBUEAAAAAAABRpYjTbQIWgbTaDGpqoAgCVBWcl2xl2oJsFUAAAAIIDrKrM6WVEUBAAAAAQ2o
OWfaTtrLtJ20reM8NJOlRAVKCMZVrK6c6RVldJduTeNKNgIgDGWQLllpztS3Y1im28cmAGsrtmdh
Owdsb4VnHppEAAAAAAATYMZ1zaz7ZWKAKoAAADWN8uscZ26zpKjQisoIAAAAAF6cc+3Zyz7WLGce
3adOOPbtOlpVAZQAAAAAAAAS3RbpzyzXFW5pM9OY1i49Ey2rhjlp1xy2zYjQCIAAAAAAAAY5bb24
zxXWXw2pazcvK53UYnaUbAZQGbVlBWbS1mqLtKgACKqgACoCCgNdRIig3PKsStoCs78rPIgmVVjI
E35bYnbfoqsZsxrLtlR1nRtN6jPy8ojoJPKoMZsNZsNRTa43yhOwdoqTorKJlXK3bWVZaiiCqqCg
Is7CdiO06TK6JfDObI1jdtOeDoACbBQS0QtSVjLJJVxTPtlbdoKAKAAAAEdZdRyXaI6StOMumpkm
DoEpsQABLdJMvLOdZxvlcV2cs+3T05Z9pCJO3adOM7dp0tKoDKAAAAAACW6VjOqrGWW2dpRpQABc
bpAHfHLbTjx12ZqAIiKCAoAAAP/Z
" width="864" height="864"/><p><span></span></p></div>
`;

export default class Webview extends React.Component {
  constructor(props) {
    super(props)
    this.chfont = this.chfont.bind(this)
  }

  state = {
    swipeablePanelActive: false,
    font: 'Roboto',
    fontsize: 20
  }

  chfont(fontfamily, fontsize) {
    console.log(fontfamily, " fontsize: ", fontsize);
    this.setState({ font: fontfamily, fontsize: fontsize })
    this.setState({
      css: `
    body {
      color: #2a2a2a;
      font-family: `+ this.state.font + `;
      font-size: `+ this.state.fontsize / 2 + `em;
    }
    h1 {
      border-bottom-width: 1px;
      border-color: #ccc;
      padding-bottom: 3px;
      border-bottom-style:solid;
      font-size: `+ this.state.fontsize * 2 + `em;
      font-weight: bold;
      letter-spacing: .05em;
    }
    p {
      letter-spacing: .03em;
      font-size: `+ this.state.fontsize + `em;
    }
    span {
      letter-spacing: .03em;
      font-size: `+ this.state.fontsize + `em;
    }
  `})
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })

    this.props.navigation.setOptions({
      title: this.state.titleinput,
      /* headerRight: () => <Button
      onPress={() => this.rendernavigation()}
      title="SAVE"
      color="#000000"
    /> */
    })
    this.closePanel();
  }

  /* componentDidMount = () => {
      this.closePanel();
  };
*/
  openPanel = () => {
    this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };

  render() {
    let fontvalue = [
      {
        title: 'notoserif',
        value: 'notoserif'
      },
      {
        title: 'sans-serif',
        value: 'sans-serif'
      },
      {
        title: 'sans-serif-light',
        value: 'sans-serif-light'
      },
      {
        title: 'sans-serif-thin',
        value: 'sans-serif-thin'
      },
      {
        title: 'sans-serif-condensed',
        value: 'sans-serif-condensed'
      },
      {
        title: 'sans-serif-medium',
        value: 'sans-serif-medium'
      },
      {
        title: 'serif',
        value: 'serif'
      },
      {
        title: 'Roboto',
        value: 'Roboto'
      },
      {
        title: 'monospace',
        value: 'monospace'
      },
      {
        title: 'normal',
        value: 'normal'
      }
    ];
    return (
      [
        <ScrollView>
          <HTMLView
            value={htmlContent}
            stylesheet={{
              a: {
                fontWeight: 'bold',
                color: '#FF3366', // make links coloured pink
              },
              h1: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              h2: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              em: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              head: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              div: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center'
              },
              p: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center',
                margin : '0px !important'
              },
              span: {
                fontSize: this.state.fontsize,
                fontFamily: this.state.font,
                fontWeight: 'bold',
                textAlign: 'center',
                margin : '0px !important'
              },
              img: {
                width: 100,
                height: 100
              }
            }}
          /></ScrollView>,
        <View>
          <Button onPress={() => this.setState({ swipeablePanelActive: true })} title="CHANGE FONT"></Button>
          <SwipeablePanel
            closeOnTouchOutside={true}
            showCloseButton
            isActive={this.state.swipeablePanelActive}
            onClose={() => this.closePanel()}
            onPressCloseButton={this.closePanel}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20 }}>Typography</Text>
              <View style={styles.Dropdown}>
                <Dropdown
                  label="Select Font"
                  labelFontSize={17}
                  baseColor="#413E4F"
                  data={fontvalue}
                  value={this.state.font}
                  inputContainerStyle={{ borderBottomWidth: 0.8, paddingLeft: 20 }}
                  onChangeText={value => this.chfont(value, this.state.fontsize)}
                />
              </View>
              <View style={styles.Dropdown}>
                <Slider
                  value={this.state.fontsize}
                  maximumValue={20}
                  minimumValue={10}
                  step={1}
                  thumbStyle={{ borderWidth: 1, borderColor: 'gray' }}
                  thumbTintColor='#ffffff'
                  value={this.state.fontsize}
                  onValueChange={value => this.chfont(this.state.font, value)}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>A-</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 20 }}>A+</Text>
                  </View>
                </View>

              </View>
            </View>
          </SwipeablePanel>
        </View>
      ]


    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Dropdown: {
    marginHorizontal: 20,
  },
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  h1: {
    //fontsize: this.state.fontsize,
    fontWeight: 'bold'
  },
  h2: {
    fontWeight: 'bold'
  },
  em: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
