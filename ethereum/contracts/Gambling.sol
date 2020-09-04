pragma experimental ABIEncoderV2;
pragma solidity ^0.4.25;


// contract CreateMatch {
    
//     address[] public deployedContracts;
//     mapping(address => string) public team1;
//     mapping(address => string) public team2;
//     function createNewmatch(string teamA, string teamB) public {
//         team1[msg.sender] = teamA;
//         team2[msg.sender] = teamB;
//         address newMatch = new Gambling(msg.sender);
//         deployedContracts.push(newMatch);
//     }
    
//     function getDeployedContracts() public returns(address[]){
//         return deployedContracts;
//     }
// }

contract CreateMatch {
    struct Match{
        string teamA;
        string teamB;
        address sender;
    }
    
    Match[] public matches;
    
    function createNewmatch(string team1, string team2) public {
        Match memory newmatch = Match({
            teamA: team1,
            teamB: team2,
            sender: new Gambling(msg.sender)
        });
       matches.push(newmatch);
    }
    
    function getDeployedContracts() public view returns(Match[]){
        return matches;
    }
}


contract Gambling {
    
    address manager;
    mapping (address => uint) public gamblers;
    uint public totalMoneyTeam1;
    uint public totalMoneyTeam2;
    uint temp;
    address[] public team1;
    address[] public team2;
    bool public complete = false;
    
    constructor(address sender) public{
        manager = sender;
    }
    
    modifier restricted{
        require(msg.sender==manager);
        _;
    }
    
    function contributeTeam1() public payable {
        gamblers[msg.sender] = msg.value;
        totalMoneyTeam1 += msg.value;
        team1.push(msg.sender);
    }
    
    function contributeTeam2() public payable {
        gamblers[msg.sender] = msg.value;
        totalMoneyTeam2 += msg.value;
        team2.push(msg.sender);
    }
    
    function Winner(uint a) public restricted{
        if(a == 1) {
            temp = totalMoneyTeam1/team2.length;
            for(uint i=0;i<team2.length;i++){
                team2[i].transfer(gamblers[team2[i]] + temp);
                totalMoneyTeam1 -= temp;
            }
        }
        
        else{
            temp = totalMoneyTeam2/team1.length;
            for(uint j=0;j<team1.length;j++){
                team1[i].transfer(gamblers[team1[i]] + temp);
                totalMoneyTeam2 -= temp;
            }
        }

        complete = true;
    }

    function gamblersTeam1() public view returns(address[]) {
        return team1;
    }

    function gamblersTeam2() public view returns(address[]) {
        return team2;
    }
}

