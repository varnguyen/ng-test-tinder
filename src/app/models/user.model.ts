
export class User {
    cell: string;
    dob: {
        age: number;
        date: string;
    };
    email: string;
    gender: string;
    job: number;
    id: {
        name: string;
        value: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        }
    };
    login: {
        password: string;
    };
    name: {
        first: string;
        last: string;
        title: string;
    };
    nat: string;
    phone: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    registered: {
        age: number
        date: string
    };

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    get defaultAvatar() {
        return 'ssets/images/loading.gif';
    }

    get fullName() {
        return `${this.name.first} ${this.name.last}`;
    }

    get fullAddress() {
        return `${this.location.street.number} ${this.location.street.name}`;
    }
}
