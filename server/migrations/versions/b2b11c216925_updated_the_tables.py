"""updated the tables

Revision ID: b2b11c216925
Revises: 7ce8e0d2d56f
Create Date: 2024-02-09 05:06:38.439812

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b2b11c216925'
down_revision = '7ce8e0d2d56f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('appointment_date', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('appointment_time', sa.DateTime(), nullable=True))
        batch_op.drop_column('name')

    with op.batch_alter_table('doctors', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fname', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('lname', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('password', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('phone_number', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('regNo', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('gender', sa.String(), nullable=True))
        batch_op.drop_column('name')
        batch_op.drop_column('schedule')
        batch_op.drop_column('departmentID')

    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fname', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('lname', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('password', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('phone_number', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('regNo', sa.Integer(), nullable=True))
        batch_op.drop_column('name')
        batch_op.drop_column('phone')
        batch_op.drop_column('address')
        batch_op.drop_column('medical_history')

    with op.batch_alter_table('treatments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('progress', sa.String(), nullable=True))
        batch_op.drop_column('prescription')
        batch_op.drop_column('diagnosis')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('treatments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('diagnosis', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('prescription', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('progress')

    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('medical_history', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('address', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('phone', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('name', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('regNo')
        batch_op.drop_column('phone_number')
        batch_op.drop_column('password')
        batch_op.drop_column('lname')
        batch_op.drop_column('fname')

    with op.batch_alter_table('doctors', schema=None) as batch_op:
        batch_op.add_column(sa.Column('departmentID', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('schedule', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('name', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('gender')
        batch_op.drop_column('regNo')
        batch_op.drop_column('phone_number')
        batch_op.drop_column('password')
        batch_op.drop_column('lname')
        batch_op.drop_column('fname')

    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('appointment_time')
        batch_op.drop_column('appointment_date')

    # ### end Alembic commands ###
