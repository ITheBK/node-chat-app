  const expect = require('expect');
  const{Users} = require('./users');

  // var users = [
  //   {
  //     id:'132121212',
  //     name:'Rajja',
  //     room:'Bakara'
  //   }
  // ]

  describe('Users', () => {

    var users;

    beforeEach(() => {
      users = new Users();
      users.users = [
        {
          id : '1',
          name: 'Bk',
          room : 'My Room'
        },
        {
          id : '2',
          name: 'Sompra',
          room : 'Sompran Mani'
        },
        {
          id : '3',
          name: 'Kutti',
          room : 'My Room'
        },
      ];
    });

    it('should add new user', () => {
      var users = new Users();
      var user = {
        id:'124',
        name:'Bharath',
        room:'My room'
      };
      var resUser = users.addUser(user.id, user.name, user.room);
      expect(users.users).toEqual([user]);
    });

    //removeUser
    it('should remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);
      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
      var userId = '0';
      var user = users.removeUser(userId);
      expect(user).toNotExist();
      expect(users.users.length).toBe(3);
    });

    //getUser
    it('should find a user', () => {
      var userId = "1";
      var user = users.getUser(userId);
      expect(user.id).toBe(userId);
      expect(user.name).toBe('Bk');
      expect(user.room).toBe('My Room');
    });

    it('should not find a user', () => {
      var invalidUserId = "0";
      var user = users.getUser(invalidUserId);

      expect(user).toNotExist();
    });

    it('should return names for My Room', () => {
      var userList = users.getUserList('My Room');
      expect(userList).toEqual(['Bk','Kutti']);
    });

    it('should return names for Sompran Mani', () => {
      var userList = users.getUserList('Sompran Mani');
      expect(userList).toEqual(['Sompra']);
    });
  });
